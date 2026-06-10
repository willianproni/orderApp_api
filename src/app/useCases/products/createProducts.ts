import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";
import { Category } from "../../models/Category.js";

export async function createProducts(req: Request, res: Response) {
  try {
    const { name, description, ingredients, price, category } = req.body;

    const imagePath = req.file?.filename;

    if (!imagePath) {
      return res.status(400).json({ error: "Image is required" });
    }

    const categoryFound = await Category.findById(category);

    if (!categoryFound) {
      return res.status(404).json({ error: "Category not found" });
    }

    const product = await Product.create({
      name,
      description,
      ingredients: JSON.parse(ingredients),
      imagePath,
      price: Number(price),
      category: category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
