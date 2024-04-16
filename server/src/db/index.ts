import { Express } from "express";
import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI as string;
const PORT: string | number = process.env.PORT || 3000;

const mongodbConnection = (app: Express) =>
  mongoose
    .connect(uri)
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      )
    )
    .catch((error) => {
      console.log("Error connecting DB");
      throw error;
    });

export default mongodbConnection;
