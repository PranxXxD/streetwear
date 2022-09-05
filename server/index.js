import { config } from "dotenv";
config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const client = new MongoClient(process.env.MONGO_CONNECTION);
client.connect().then(() => {
  console.log("Connected to db");
});

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/server/index", async (req, res) => {
  let result = await client
    .db("streetWear")
    .collection("products")
    .findOne({ title: "streetWear" });
});

app.listen(3000, console.log)("Listening on port 3000");
// const handler = async (req, res) => {
//   try {
//     if (req.query.title) {
//       let results;
//       if (req.query.title.includes(",") || req.query.title.includes(" ")) {
//         results = await client
//           .db("streetWear")
//           .collection("products")
//           .aggregate([
//             {
//               $search: {
//                 index: "autocomplete",
//                 autocomplete: {
//                   query: req.query.title,
//                   path: "title",
//                   fuzzy: {
//                     maxEdits: 1,
//                   },
//                   tokenOrder: "sequential",
//                 },
//               },
//             },
//             {
//               $project: {
//                 searchName: 1,
//                 _id: 1,
//                 city: 1,
//                 country: 1,
//                 adminCode: 1,
//                 countryCode: 1,
//                 fullName: 1,
//                 score: { $meta: "searchScore" },
//               },
//             },
//             {
//               $limit: 10,
//             },
//           ])
//           .toArray();

//         return res.send(results);
//       }

//       results = await client
//         .db("streetWear")
//         .collection("products")
//         .aggregate([
//           {
//             $search: {
//               index: "default",
//               compound: {
//                 must: [
//                   {
//                     text: {
//                       query: req.query.title,
//                       path: "title",
//                       fuzzy: {
//                         maxEdits: 1,
//                       },
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 1,
//               title: 1,
//               slug: 1,
//               desc: 1,
//               category: 1,
//               size: 1,
//               color: 1,
//               price: 1,
//               score: { $meta: "searchScore" },
//             },
//           },
//           {
//             $limit: 10,
//           },
//         ])
//         .toArray();

//       return res.status(200).json({ results });
//     }
//     res.send([]);
//   } catch (error) {
//     console.error(error);
//     res.send([]);
//   }

//   let result = await client
//     .db("streetWear")
//     .collection("products")
//     .findOne({ slug: req.body.slug });

//   return res.status(200).json({ result });
// };

// export default connectDb(handler);
