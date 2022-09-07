import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let clothes = {};
  console.log(products);

  // looping through the product array
  for (let item of products) {
    // display the tshirt if the color & size is available
    clothes[item.title] = JSON.parse(JSON.stringify(item));
  }
  return res.status(200).json({ clothes });

  //     try {
  //       if (req.query.title) {
  //         let results;
  //         if (req.query.title.includes(",") || req.query.title.includes(" ")) {
  //           results = await client
  //             .db("streetWear")
  //             .collection("products")
  //             .aggregate([
  //               {
  //                 $search: {
  //                   index: "autocomplete",
  //                   autocomplete: {
  //                     query: req.query.title,
  //                     path: "title",
  //                     fuzzy: {
  //                       maxEdits: 1,
  //                     },
  //                     tokenOrder: "sequential",
  //                   },
  //                 },
  //               },
  //               {
  //                 $project: {
  //                   searchName: 1,
  //                   _id: 1,
  //                   city: 1,
  //                   country: 1,
  //                   adminCode: 1,
  //                   countryCode: 1,
  //                   fullName: 1,
  //                   score: { $meta: "searchScore" },
  //                 },
  //               },
  //               {
  //                 $limit: 10,
  //               },
  //             ])
  //             .toArray();

  //           return res.send(results);
  //         }
  //         if (req.query.title.includes(",") || req.query.title.includes(" ")) {
  //           results = await client
  //             .db("streetWear")
  //             .collection("products")
  //             .aggregate([
  //               {
  //                 $search: {
  //                   index: "default",
  //                   compound: {
  //                     must: [
  //                       {
  //                         text: {
  //                           query: req.query.title,
  //                           path: "title",
  //                           fuzzy: {
  //                             maxEdits: 1,
  //                           },
  //                         },
  //                       },
  //                     ],
  //                   },
  //                 },
  //               },
  //               {
  //                 $project: {
  //                   _id: 1,
  //                   title: 1,
  //                   slug: 1,
  //                   desc: 1,
  //                   category: 1,
  //                   size: 1,
  //                   color: 1,
  //                   price: 1,
  //                   score: { $meta: "searchScore" },
  //                 },
  //               },
  //               {
  //                 $limit: 10,
  //               },
  //             ])
  //             .toArray();

  //           return res.status(200).json({ results });
  //         }
  //         res.send([]);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       return res.send([]);
  //     }

  //     let result = await client
  //       .db("streetWear")
  //       .collection("products")
  //       .findOne({ desc: req.query.desc });
  //     return res.status(200).json({ result });
  //   }
  //   return res.status(404).json({ error: true });
};

export default connectDb(handler);
