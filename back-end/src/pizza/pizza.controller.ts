import PizzaService from "./pizza.service";
import { Request, Response } from "express";
import { PizzaParams, RequestProps } from "./pizza.types";
import PizzaValidator from "./pizza.validation";

const pizzaValidator = new PizzaValidator()

class PizzaController{
    public async getPizzas(req: Request, res: Response){
        try {
            const {page, limit, category, sortBy, order, search} = req.query
            const params = {
                page,
                limit,
                category,
                search,
                order,
                sortBy
            } as RequestProps

            for(let prop in params){
                if(prop == null || prop == undefined){
                    res.status(500).json({message: "Error: wrong request data(all parametes are requared)"})
                }
            }

            const pizzas = await PizzaService.getPizzasByParams(params);
            
            res.json(pizzas)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async addNewPizza(req: Request, res: Response){
        try{
            const newPizza: PizzaParams = req.body

            if(pizzaValidator.validatePizzaParams(newPizza)){
                const addedPizza = await PizzaService.addPizza(newPizza)
                res.status(200).json(addedPizza)
            }else{
                res.status(400).json({message: "Error: Bad Request"})
            }
        }catch(e){
            res.status(500).json({message: "Server Error"})
        }
    }
}

export default new PizzaController