import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const dbUri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-vupa4c-shard-0&authSource=admin&retryWrites=true&w=majority`;
  // console.log(dbUri)
  try {
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUri); // Add 'await' here
    console.log("Connect DB Success");
  } catch (isErr) {
    console.error("Connect DB Failed");
  }
};

export { connectDB };
