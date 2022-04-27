// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Products from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Products.find();
  res.status(200).json({ products });
};

export default connectDb(handler);
