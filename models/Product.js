const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    availableQty: { type: String, required: true },
  },
  { timestamps: true }
);

//preventing from creating the model everytime

// mongoose.models = {};
// export default mongoose.model("Product", ProductSchema);

// works same as above lines 20 and 21
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
