import express from "express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Success conection mongodb 🍃");

    const app = express();

    app.listen(3000, () => {
      console.log("🚀 Server is running on http://localhost:3001");
    });
  })
  .catch(() => console.log("❌ Error conection mongodb"));
