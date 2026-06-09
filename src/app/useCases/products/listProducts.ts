import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(204).send();
    }

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
