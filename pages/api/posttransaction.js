// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {
  // validate paytm checksum

  var paytmChecksum = "";
  var paytmParams = {};
  const received_data = req.body;
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MKEY,
    paytmChecksum
  );
  if (!isValidChecksum) {
    res.status(500).send("Some Error Occurred");
    return;
  }

  // Updating the staus into the orders table after checking the transaction status
  let order;
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      {
        orderId: req.body.ORDERID,
      },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );

    // update the stock inventory after the order is completed
    let products = order.products;
    for (slug in products) {
      console.log(products[slug].qty);
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      {
        orderId: req.body.ORDERID,
      },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }

  //initiating shipping

  //Redirecting the user to the orders confrimation page
  res.redirect("/order?clrCart=1&id=" + order._id, 200);
};

//   res.status(200).json({ body: req.body });

export default connectDb(handler);
