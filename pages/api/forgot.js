// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // check if the user exists in the database
  //send a email to user
  let token = `398y234bfu943ru0fsdokvnish`;
  let email = `We have sent you this email in response to your request to reset your password on streetWear.com. 
    To reset your password, please follow the link below:
    <a href="https://streetWear.com/forgotpwd">Click here to reset the password </a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with aIf you feel your password has been compromised, you can change it by to your My Account Page and change the password

    <br/><br/>`;

  res.status(200).json({ name: "John Doe" });
}
