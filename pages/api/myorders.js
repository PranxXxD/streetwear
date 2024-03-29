import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
// import jsonwebtoken from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  let token = req.body.token;
  let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(data);
  // let orders = await Order.find({ email: data.email, status: "Paid" });
  let orders = await Order.find({ email: data.email, status: "Pending" });
  res.status(200).json({ orders });
};
export default connectDb(handler);
