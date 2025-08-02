import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInsance = await mongoose.connect(
      `${process.env.Atlas_URL}/${DB_NAME}`
    );
    console.log(
      `
      MongoDB Conncented || DB Host ${connectionInsance.connection.host}`
    );
  } catch (err) {
    console.log(`MONGODB connection failed , ${err}`);
    process.exit(1);
  }
};

export default connectDB;
