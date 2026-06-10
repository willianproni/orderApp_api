import path from "node:path";

import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories.js";
import { createCategory } from "./app/useCases/categories/createCategory.js";
import { listProducts } from "./app/useCases/products/listProducts.js";
import { createProducts } from "./app/useCases/products/createProducts.js";
import { deleteCategory } from "./app/useCases/categories/deleteCategory.js";
import multer from "multer";
import { fileURLToPath } from "node:url";
import { listProductsByCategoryId } from "./app/useCases/categories/listProductsByCategoryId.js";

export const routes = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  O Multer é o middleware que deixa o Node/Express pronto para receber
//  arquivos enviados por formulário e salvá-los, e no caso ele está
//  sendo usado para armazenar imagens no uploads/ via diskStorage.

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, cb) {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
});

routes.get("/categories", listCategories);

routes.post("/categories", createCategory);

routes.delete("/categories/:categoryId", deleteCategory);

routes.get("/products", listProducts);

routes.post("/products", upload.single("imagePath"), createProducts);

routes.get("/categories/:categoryId/products", listProductsByCategoryId);

routes.get("/orders", (req, res) => {});

routes.post("/orders", (req, res) => {});

routes.patch("/orders/:orderId", (req, res) => {});

routes.delete("/orders/:orderId", (req, res) => {});
