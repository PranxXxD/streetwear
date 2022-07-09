// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    let dbuser = await User.findOne({ email: user.email });
    const bytes = CryptoJS.AES.decrypt(
      dbuser.password,
      process.env.AES_SECRET_KEY
    );
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedPass);
    if (
      decryptedPass == req.body.password &&
      req.body.npassword == req.body.cpassword
    ) {
      await User.findOneAndUpdate(
        { email: dbuser.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cpassword,
            process.env.AES_SECRET_KEY
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
      return;
    }
    res.status(200).json({ success: false });
  } else {
    res.status(400).json({ error: error });
  }
};

export default connectDb(handler);
