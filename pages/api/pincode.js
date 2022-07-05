// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincode from "../../pincode data/pincode.json";

export default function handler(req, res) {
  res.status(200).json(pincode);
}
