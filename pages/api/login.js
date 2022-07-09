// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    // find the user by the email id
    let user = await User.findOne({ email: req.body.email });
    // decrypting the password
    let bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET_KEY);
    // console.log(bytes.toString(CryptoJS.enc.Utf8));
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    if (user) {
      // check the given inputs from the user and then authenticate
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        let token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2d" }
        );
        res.status(200).json({ success: true, token, email: user.email });
      } else {
        //   throw the error message if the user enter the wrong credentials
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      //   throw the error message if the user enter the wrong credentials
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    //   throw error if user not found in database
    res
      .status(400)
      .json({ success: false, error: "This Method is not allowed" });
  }
};

// establish connection with the mongodb
export default connectDb(handler);
