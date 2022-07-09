// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    console.log(user);
    res.status(200).json({ user: user });
  } else {
    res.status(400).json({ error: error });
  }
};

export default connectDb(handler);
