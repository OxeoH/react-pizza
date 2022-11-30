import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Pizza } from "./pizza.entity";
import { PizzaParams } from "./pizza.types";


class PizzaService{
    pizzaRepository: Repository<Pizza>

    constructor(){
        this.pizzaRepository = AppDataSource.getRepository<Pizza>(Pizza)
    }

    public async getAllPizzas(){
        const pizzas = await this.pizzaRepository.find()
        return pizzas
    }

    public async addPizza(pizzaInfo: PizzaParams){
        const newPizza = new Pizza
        newPizza.imageUrl = pizzaInfo.imageUrl
        newPizza.title = pizzaInfo.title
        newPizza.types = pizzaInfo.types
        newPizza.sizes = pizzaInfo.sizes
        newPizza.category = pizzaInfo.category
        newPizza.price = pizzaInfo.price
        newPizza.rating = pizzaInfo.rating

        const savedPizza = await this.pizzaRepository.save(newPizza)

        return savedPizza
    }

}

export default new PizzaService