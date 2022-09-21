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
              title: 1,
              _id: 1,
              desc: 1,
              color: 1,
              size: 1,
              availableQty: 1,
              score: { $meta: "searchScore" },
            },
          },
          {
            $limit: 10,
          },
        ]).toArray();
        res.status(200).json({ results });
      }
      results = await Product.aggregate([
        {
          $search: {
            index: "autocomplete",
            autocomplete: {
              query: req.query.slug,
              path: "slug",
              fuzzy: {
                maxEdits: 1,
              },
              tokenOrder: "sequential",
            },
          },
        },
        {
          $project: {
            title: 1,
            _id: 1,
            desc: 1,
            color: 1,
            size: 1,
            availableQty: 1,
            score: { $meta: "searchScore" },
          },
        },
        {
          $limit: 10,
        },
      ]).toArray();
      res.status(200).json({ results });
    }
    return res.send([]);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error });
  }
};

export default connectDb(handler);
