const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema(
  {
    // Userid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

// mongoose.models = {};
// export default mongoose.model("User", UserSchema);

// works same as above lines 12 and 13

export default mongoose.models.User || mongoose.model("Forgot", ForgotSchema);
