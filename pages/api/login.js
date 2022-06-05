// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    // find the user by the email id
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // check the given inputs from the user and then authenticate
      if (req.body.email == user.email && req.body.password == user.password) {
        res
          .status(200)
          .json({ success: true, email: user.email, name: user.name });
      } else {
        //   throw the error message if the user enter the wrong credentials
        res.status(400).json({ success: false, error: "Invalid Credentials" });
      }
    }
  } else {
    //   throw error if user not found in database
    res.status(400).json({ success: false, error: "No user Found" });
  }
};

// establish connection with the mongodb
export default connectDb(handler);
