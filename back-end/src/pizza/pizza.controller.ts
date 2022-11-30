import PizzaService from "./pizza.service";
import { Request, Response } from "express";
import { PizzaParams } from "./pizza.types";

class PizzaController{
    public async getPizzas(req: Request, res: Response){
        try {
            const {currentPage, limit, category, sortBy, order, search} = req.query
            console.log(req.query)

            const pizzas = await PizzaService.getAllPizzas();
            
            res.json(pizzas)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async addNewPizza(req: Request, res: Response){
        try{
            const newPizza: PizzaParams = req.body
            for(let prop in newPizza){
                if(prop.length <= 0){
                    res.status(400).json({message: "Error: Bad Request (All props of object are requared)"})
                }
            }
            const addedPizza = await PizzaService.addPizza(newPizza)
            res.json(addedPizza)
        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }
}

export default new PizzaController