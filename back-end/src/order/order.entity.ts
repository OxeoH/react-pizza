import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column()
    comment: string

    @Column()
    description: string

    @Column()
    paymentType: string

    @Column()
    price: number

}