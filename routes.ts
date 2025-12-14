import { Router } from "express";
import { listCategories } from "./src/app/useCases/categories/listCategories.js";
import { createCategory } from "./src/app/useCases/categories/createCategory.js";
import { listProducts } from "./src/app/useCases/products/listProducts.js";
import { createProducts } from "./src/app/useCases/products/createProducts.js";

export const routes = Router();

routes.get("/categories", listCategories);

routes.post("/categories", createCategory);

routes.get("/products", listProducts);

routes.post("/products", createProducts);

routes.get("/categories/:CategoryId/products", (req, res) => {});

routes.get("/orders", (req, res) => {});

routes.post("/orders", (req, res) => {});

routes.patch("/orders", (req, res) => {});

routes.patch("/orders", (req, res) => {});

routes.delete("/orders/:orderId", (req, res) => {});
