import { Router } from "express";
import { listCategories } from "./src/app/useCases/listCategories.js";
import { createCategory } from "./src/app/useCases/createCategory.js";

export const routes = Router();

routes.get("/categories", listCategories);

routes.post("/categories", createCategory);

routes.get("/products", (req, res) => {});

routes.post("/products", (req, res) => {});

routes.get("/categories/:CategoryId/products", (req, res) => {});

routes.get("/orders", (req, res) => {});

routes.post("/orders", (req, res) => {});

routes.patch("/orders", (req, res) => {});

routes.patch("/orders", (req, res) => {});

routes.delete("/orders/:orderId", (req, res) => {});
