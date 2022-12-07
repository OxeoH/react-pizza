import dotenv from "dotenv"
dotenv.config()

import AppDataSource from "./data-source"
import express from "express"
import cors from 'cors'
import orderRouter from "./order/order.router"
import pizzaRouter from "./pizza/pizza.router"



const app = express()

app.use(express.json())

app.use(cors())

app.use('/orders', orderRouter)
app.use('/pizzas', pizzaRouter)

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
//     res.setHeader('Access-Control-Allow-Credetials', "true")
//     next()
// })

const port = process.env.PORT || 5000

const main = async () =>{
    try{
        await AppDataSource.initialize()
        app.listen(port, () => {
            console.log("Server is working on port " + port)
            
        })
    }catch(e){
        console.log(e);
    }
}

main()