const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    incident: { type: String, default: "" },
  },
  { timestamps: true }
);

// mongoose.models = {};
// export default mongoose.model("User", UserSchema);

// works same as above lines 12 and 13

export default mongoose.models.Incident ||
  mongoose.model("Incident", UserSchema);
