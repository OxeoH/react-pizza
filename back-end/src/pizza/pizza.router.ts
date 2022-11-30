import { Router, Response, Request } from "express";
import PizzaController from "./pizza.controller";


const pizzaRouter = Router()

pizzaRouter.get("/",async (req:Request, res: Response) => {
    console.log(req.hostname);
    
    await PizzaController.getPizzas(req, res);
})
pizzaRouter.post("/", async (req: Request, res: Response) => {
    await PizzaController.addNewPizza(req, res)
})


export default pizzaRouter
