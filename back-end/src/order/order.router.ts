import { Request, Response, Router } from "express";
import OrderController from "./order.controller"

const orderRouter = Router()

orderRouter.get("/", async (req: Request, res: Response) => {
    await OrderController.getAllOrders(req, res)
})

orderRouter.get("/:id", async (req: Request, res: Response) => {
    await OrderController.getOrderById(req, res)
})

orderRouter.delete("/:id", async (req: Request, res: Response) => {
    await OrderController.deleteOrder(req, res)
})

orderRouter.post("/", async (req: Request, res: Response) => {
    await OrderController.createOrder(req, res)
})

orderRouter.put("/", async (req: Request, res: Response) => {
    await OrderController.updateOrder(req, res)
})

export default orderRouter