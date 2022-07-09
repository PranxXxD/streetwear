// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    let dbuser = await User.findOne({ email: user.email });
    // console.log(dbuser);
    const { email, name, address, pincode, phone } = dbuser;
    res.status(200).json({ email, name, address, pincode, phone });
  } else {
    res.status(400).json({ error: error });
  }
};

export default connectDb(handler);
