import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Success conection mongodb 🍃");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();

    app.use('/uploads', express.static(path.resolve(__dirname, "..", "uploads")));
    app.use(express.json());

    app.use(routes);

    app.listen(3001, () => {
      console.log("🚀 Server is running on http://localhost:3001");
    });
  })
  .catch(() => console.log("❌ Error conection mongodb"));
