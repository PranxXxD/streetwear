// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import pincodedata from "../../pincode data/pincodedata.json";

export default function handler(req, res) {
  let pincodes = {
    400037: ["Mumbai", "Maharastra"],
    110001: ["Delhi", "Delhi"],
    226001: ["Lucknow", "UttarPradesh"],
    383215: ["Talod", "Gujarat"],
  };

  res.status(200).json(pincodes);
}
