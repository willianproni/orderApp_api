import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes.js";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Success conection mongodb 🍃");

    const app = express();

    app.use(express.json());

    app.use(routes);

    app.listen(3001, () => {
      console.log("🚀 Server is running on http://localhost:3001");
    });
  })
  .catch(() => console.log("❌ Error conection mongodb"));
