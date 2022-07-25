// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/Forgot";
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
import jsonwebtoken from "jsonwebtoken";
import sendEmail from "../../utilities/sendEmail";

const handler = async (req, res) => {
  // check if the user exists in the database
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (req.body.sendEmail) {
      let token = jsonwebtoken.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      let forgot = new Forgot({
        // userid: users._id,
        email: req.body.email,
        token: token,
      });

      // sending reset email

      await forgot.save();
      try {
        await new sendEmail(user, token).sendMagicLink();
        return res.status(200).json({ success: true });
      } catch (error) {
        user.token = undefined;
        res.status(500).json({ error: true, message: "Internal Server Error" });
      }
    } else if (req.body.npassword == req.body.cpassword) {
      //   Reset User Password

      await User.findOneAndUpdate(
        { email: user.email },
        {
          npassword: CryptoJS.AES.encrypt(
            req.body.cpassword,
            process.env.AES_SECRET_KEY
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
      return;
    }
  } else {
    res.status(400).json({ success: false });
    return;
  }
};
export default connectDb(handler);
