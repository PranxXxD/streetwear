// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/Forgot";
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
import jsonwebtoken from "jsonwebtoken";

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

      let Email = `We have sent you this email in response to your request to reset your password on streetWear.com. 
      To reset your password, please follow the link below:
     <a href="https://streetWear.com/forgotpwd?token=${token}">Click here to reset the password </a>

     <br/><br/>

     We recommend that you keep your password secure and not share it with aIf you feel your password has been compromised, you can change it by going to your My Account Page and change the password

     <br/><br/>`;
      await forgot.save();
      res.status(200).json({ success: true, token, Email });
      return;
    } else {
      //   Reset User Password
      if (req.body.npassword == req.body.cpassword) {
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
    }
  } else {
    res.status(400).json({ success: false });
    return;
  }
};
export default connectDb(handler);
