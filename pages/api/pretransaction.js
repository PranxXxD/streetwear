const https = require("https");
const PaytmChecksum = require("paytmChecksum");
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    // Check if the cart is tampered with
    let product;
    let sumTotal = 0;
    if (req.body.subTotal <= 0) {
      res.status(200).json({
        sucess: false,
        error: "Your cart is empty, add someitems to the cart and try again",
      });
      return;
    }
    let cart = req.body.cart;
    for (let item in cart) {
      // console.log(item);
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });

      //check if the cart items are out of stock
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          sucess: false,
          error:
            "Some items in the cart are out of stock please try again later",
        });
      }

      if (product.price != cart[item].price) {
        res.status(200).json({
          sucess: false,
          error:
            "The product price of someitem in cart has been changed kindly check again",
        });
        return;
      }
      if (sumTotal !== req.body.subTotal) {
        res.status(200).json({
          sucess: false,
          error:
            "The product price of someitem in cart has been changed kindly check again",
        });
        return;
      }
    }

    //check if the details are valid
    if (
      req.body.phone.length !== 10 ||
      !Number.isInteger(Number(req.body.phone))
    ) {
      res.status(200).json({
        success: false,
        error: "Please enter your 10 digit valid phone number",
      });
      return;
    }
    if (
      req.body.pincode.length !== 6 ||
      !Number.isInteger(Number(req.body.pincode))
    ) {
      res.status(200).json({
        success: false,
        error: "Please enter your 6 digit valid pincode",
      });
      return;
    }

    //Initiate an order corresponding to this orderId

    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      amount: req.body.subTotal,
      address: req.body.address,
      products: req.body.cart,
    });

    await order.save();
    // insert and entry in the orders table with staus as pending

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "WEBSTAGING",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var post_data = JSON.stringify(paytmParams);

        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",

          /* for Production */
          //   hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            // console.log("Response: ", response);
            let ress = JSON.parse(response).body;
            ress.success = true;
            resolve(ress);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
    const myr = await requestAsync();
    res.status(200).json(myr);
  }
};
export default connectDb(handler);
