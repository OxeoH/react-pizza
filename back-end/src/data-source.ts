import "reflect-metadata"
import { DataSource } from "typeorm"
import { Order } from "./order/order.entity"
import { Pizza } from "./pizza/pizza.entity"


const AppDataSource = new DataSource({
    type: "postgres",//process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD?.toString(),
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Order, Pizza],
})


export default AppDataSource