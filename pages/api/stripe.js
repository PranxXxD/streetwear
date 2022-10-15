import { loadStripe } from "@stripe/stripe-js";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import Order from "../../models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.Method == "POST") {
    try {
      const { email, name, address } = req.body;
      const products = await Product.findById({ id: _id });

      for (let productID of products) {
        let line_items = [];
        const qty = products.filter((id) => id === productID).length;
        const product = products.find((product) => product.id === productID);
        line_items.push({
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          qty,
          price_data: {
            currency: "INR",
            price: req.body.subTotal,
            products_data: { name: product.name },
          },
        });
      }

      console.log(products);

      let order = new Order({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        orderId: req.body.oid,
        amount: req.body.subTotal,
        address: req.body.address,
        address: req.body.district,
        address: req.body.state,
        products: req.body.cart,
      });
      await order.save();
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        customerEmail: email,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
export default connectDb(handler);
