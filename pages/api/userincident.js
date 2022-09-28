import connectDb from "../../middleware/mongoose";
import Incident from "../../models/Incident";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    // destructuring object
    const { name, email, address, phone, incident } = req.body;
    // encrypting the password
    let u = new Incident({
      name,
      email,
      address,
      phone,
      incident,
    });
    await u.save();
    // console.log(u);
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "This is bad request" });
  }
};

// establish connection with the mongodb
export default connectDb(handler);
