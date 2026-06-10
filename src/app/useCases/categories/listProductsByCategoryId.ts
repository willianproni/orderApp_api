import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";
import { Category } from "../../models/Category.js";
import mongoose from "mongoose";

export async function listProductsByCategoryId(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const validatedCategoryId = await Category.findById(categoryId);

    if (!validatedCategoryId) {
      return res.status(404).json({ error: "Category not found" });
    }

    const product = await Product.find({ category: categoryId });

    if (product.length === 0) {
      return res.status(204).send();
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
