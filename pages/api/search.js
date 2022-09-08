import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.findOne({ slug: req.query.slug });

  //   console.log(products);
  // looping through the product array
  for (let item of Object.keys(products)) {
    products[item.title] = JSON.parse(JSON.stringify(item));
  }
  return res.status(200).json({ products });

  //   try {
  //     if (req.query.title) {
  //       let results;
  //       if (req.query.title.includes(",") || req.query.title.includes(" ")) {
  //         results = await products
  //           .db("streetWear")
  //           .collection("products")
  //           .aggregate([
  //             {
  //               $search: {
  //                 index: "default",
  //                 compound: {
  //                   must: [
  //                     {
  //                       text: {
  //                         query: req.query.title,
  //                         path: "title",
  //                         fuzzy: {
  //                           maxEdits: 1,
  //                         },
  //                       },
  //                     },
  //                   ],
  //                 },
  //               },
  //             },
  //             {
  //               $project: {
  //                 _id: 1,
  //                 title: 1,
  //                 slug: 1,
  //                 desc: 1,
  //                 category: 1,
  //                 size: 1,
  //                 color: 1,
  //                 price: 1,
  //                 score: { $meta: "searchScore" },
  //               },
  //             },
  //             {
  //               $limit: 10,
  //             },
  //           ])
  //           .toArray();

  //         return res.status(200).json({ results });
  //       }
  //       res.send([]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.send([]);
  //   }

  //   let result = await client
  //     .db("streetWear")
  //     .collection("products")
  //     .findOne({ desc: req.query.desc });
  //   return res.status(200).json({ result });
};

export default connectDb(handler);
