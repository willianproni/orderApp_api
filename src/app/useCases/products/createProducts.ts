import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";

export async function createProducts(req: Request, res: Response) {
  try {
    const { name, description, igredients, imagePath, price, category_id } =
      req.body;

    const product = await Product.create({
      name,
      description,
      igredients,
      imagePath,
      price,
      category: category_id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
