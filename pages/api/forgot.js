// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/Forgot";
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
import jsonwebtoken from "jsonwebtoken";
import emailjs from "emailjs";
const handler = async (req, res) => {
  // check if the user exists in the database
  const { email } = req.body;
  const client = emailjs.server.connect({
    user: process.env.MAIL,
    password: process.env.PASSWORD,
    host: "smtp.gmail.com",
    ssl: true,
  });
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
      client.send({
        text: `Just for testing purpose ${token}`,
        from: process.env.MAIL,
        to: email,
        subject: "testing emailjs",
      }),
        function (err, message) {
          console.log(err || message);
        };

      res.status(200).json({ message: "Send Mail" });
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

// text: `We have sent you this email in response to your request to reset your password on       streetWear.com.
// To reset your password, please follow the link below:
// <a href="https://streetWear.com/forgotpwd?token=${token}">Click here to reset the password </a>

// <br/><br/>

// We recommend that you keep your password secure and not share it with aIf you feel your password has been compromised, you can change it by going to your My Account Page and change the password

// <br/><br/>`,
