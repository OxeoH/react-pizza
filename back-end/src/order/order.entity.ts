import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
// import { Pizza } from "../entity/pizzaModel"
import { Client } from "../client/client.entity"

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    description: string

    @Column()
    price: number

    @ManyToOne(() => Client, (client) => client.id)
    clientId: Client

    // @Column()
    // items: Pizza[]
}