import type { Request, Response } from "express";
import { Category } from "../../models/Category.js";

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(204).send();
    }

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
