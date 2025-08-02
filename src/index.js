import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`The app is listening to port: ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log(`Error is : ${err}`);
    throw err;
  });
