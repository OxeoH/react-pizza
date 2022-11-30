import { Repository } from "typeorm"
import AppDataSource from "../data-source"
import { Order } from "./order.entity"
import { CreateOrderParams } from './order.types'

class OrderService{
    orderRepository: Repository<Order>

    constructor(){
        this.orderRepository = AppDataSource.getRepository<Order>(Order)
    }

    public async createNewOrder(orderInfo: CreateOrderParams): Promise<Order>{
        const newOrder = new Order
        newOrder.clientId = orderInfo.clientId
        newOrder.description = orderInfo.description
        newOrder.price = orderInfo.price

        const savedOrder = await this.orderRepository.save(newOrder)

        return savedOrder
    }

    public async getOrder(id: string){
        const order = await this.orderRepository.findOneBy({id})
        return order
    }

    public async getAllOrders(): Promise<Order[]>{
        const orders = await this.orderRepository.find()
        return orders
    }

    public async updateOrder(editedOrder){
        const order = await this.orderRepository.update(editedOrder.id, editedOrder);//???????????????????
        return order
    }

    public async deleteOrder(id: string){
        const deletedOrder = await this.orderRepository.delete({id})
        return deletedOrder
    }

}

export default new OrderService;

