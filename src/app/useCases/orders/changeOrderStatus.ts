import type { Request, Response } from "express";
import { Order } from "../../models/Order.js";
import mongoose from "mongoose";

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res.status(400).json({
        error: "Status should b one of these: WAITING, IN_PRODUCTION, DONE",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
