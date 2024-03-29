// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  // tshirt is an object
  let tshirts = {};
  // looping through the product array
  for (let item of products) {
    //add the item color & size in tshirts array if it is availabe
    // taking title as a key and tshirts as a value
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty < 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    }
    // display the tshirt if the color & size is available
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  res.status(200).json({ tshirts });
};

export default connectDb(handler);
