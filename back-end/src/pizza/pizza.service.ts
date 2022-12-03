import { ILike, Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Pizza } from "./pizza.entity";
import { PizzaParams, RequestProps } from "./pizza.types";

class PizzaService{
    pizzaRepository: Repository<Pizza>

    constructor(){
        this.pizzaRepository = AppDataSource.getRepository<Pizza>(Pizza)
    }

    public async getPizzasByParams(reqParams: RequestProps){
        const {page, limit, category, search, order, sortBy} = reqParams
        
        const skipValue = ((+limit) * (+page - 1))

        let queryProps = {
            order: {
                [sortBy]: order.toUpperCase()
            },
            skip: skipValue,
            take: +limit,
        }

        if(+category > 0){
            if(search !== ''){
                queryProps = Object.assign({ where: {category: +category, title: ILike(`%${search}%`)}}, queryProps)  
            }else{
                queryProps = Object.assign({ where: {category: +category}}, queryProps)
            }
        }        

        const pizzas = await this.pizzaRepository.find(queryProps)

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