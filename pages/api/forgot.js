// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/Forgot";
import User from "../../models/User";

export default async function handler(req, res) {
  // check if the user exists in the database
  //send a email to user
  if (req.body.sendEmail) {
    let token = `398y234bfu943ru0fsdokvnish`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });
    let email = `We have sent you this email in response to your request to reset your password on streetWear.com. 
    To reset your password, please follow the link below:
    <a href="https://streetWear.com/forgotpwd?token=${token}">Click here to reset the password </a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with aIf you feel your password has been compromised, you can change it by going to your My Account Page and change the password

    <br/><br/>`;
  } else {
    //   Reset User Password
  }
  res.status(200).json({ success: true });
}
