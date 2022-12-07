import { Request, Response } from "express";
import OrderService from "./order.service";
import { CreateOrderParams } from "./order.types";

class OrderController {
    public async createOrder(req: Request, res: Response){
        try{
            const newOrder: CreateOrderParams = req.body.params
            
            if(newOrder.name === "" || newOrder.phone === "" || newOrder.address === ""){
                res.status(400).json({message: "Error: Bad Request (NAME, PHONE, ADDRESS are requared)"})
            }

            const createdOrder = await OrderService.createNewOrder(newOrder)
            res.json(createdOrder)
        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }

    public async getAllOrders(req: Request, res: Response){
        try{
            const orders = await OrderService.getAllOrders()
            res.json(orders)
        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }

    public async getOrderById(req: Request, res: Response){
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({message: "Error: Bad Request (There is no ID)"})
            }

            const order = await OrderService.getOrder(id)
            res.json(order)
        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }

    public async deleteOrder(req: Request, res: Response){
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({message: "Error: Bad Request (There is no ID)"})
            }

            const deletedOrder = await OrderService.deleteOrder(id)
            res.json(deletedOrder)
        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }

    public async updateOrder(req: Request, res: Response){
        try{
            const editedOrder = req.body
            if(!editedOrder.id){
                res.status(400).json({message: "Error: Bad Request (There is no ID)"})
            }
            const updatedOrder = await OrderService.updateOrder(editedOrder)
            return updatedOrder

        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }
}

export default new OrderController