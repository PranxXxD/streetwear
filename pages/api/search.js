import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  // through the product array
  try {
    if (req.query.title) {
      let results;
      if (req.query.title.includes(",") || req.query.title.includes(" ")) {
        results = await Product.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.title,
                path: "title",
                fuzzy: {
                  maxEdits: 1,
                },
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              searchName: 1,
              _id: 1,
              city: 1,
              country: 1,
              adminCode: 1,
              countryCode: 1,
              fullName: 1,
              score: { $meta: "searchScore" },
            },
          },
          {
            $limit: 10,
          },
        ]).exec();
        res.status(200).json({ results });
      }
      return res.send([]);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error });
  }
  let result = await Product.find();
  //   console.log(result);
  res.status(200).json({ result });
};

export default connectDb(handler);
