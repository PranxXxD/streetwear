// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // Updating the staus into the orders table afte the checking the transaction status
  //initiating shipping
  //Redirecting the user to the orders confrimation page

  res.status(200).json({ body: req.body });
}
