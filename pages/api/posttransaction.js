// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  // validate paytm checksum

  // Updating the staus into the orders table afte the checking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    let order = await Order.findOneAndUpdate(
      {
        orderId: req.body.ORDERID,
      },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.STATUS == "PENDING") {
    let order = await Order.findOneAndUpdate(
      {
        orderId: req.body.ORDERID,
      },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }
};
//initiating shipping

//Redirecting the user to the orders confrimation page
res.redirect("/order?id=" + order._Id, 200);

//   res.status(200).json({ body: req.body });

export default connectDb(handler);
