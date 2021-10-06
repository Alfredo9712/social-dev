import { connect } from "mongoose";
require("dotenv").config();
const mongoUri: string = process.env.MONGO_URI as string;
export const connectDB = async (): Promise<void> => {
  try {
    await connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
