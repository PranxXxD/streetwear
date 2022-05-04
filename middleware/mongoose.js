import mongoose from "mongoose";

// Initiating the mongoose connection

const connectDb = (handler) => async (req, res) => {
  console.log(process.env.MONGO_URI)
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};

export default connectDb;
