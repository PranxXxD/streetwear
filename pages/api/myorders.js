import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  let token = req.body.token;
  let data = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(data);
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders });
};
export default connectDb(handler);
