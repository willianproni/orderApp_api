import { Category } from "../../models/Category.js";
import type { Request, Response } from "express";

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
