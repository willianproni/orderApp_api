import type { Request, Response } from "express";
import { Order } from "../../models/Order.js";

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("products.product");

    if (orders.length === 0) {
      return res.status(204).send();
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
