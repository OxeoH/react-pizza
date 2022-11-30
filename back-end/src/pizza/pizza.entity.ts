import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Pizza {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    imageUrl: string

    @Column()
    title: string

    @Column("integer", {array: true})
    types: number[]

    @Column("integer", {array: true})
    sizes: number[]

    @Column()
    price: number

    @Column()
    category: number

    @Column()
    rating: number
}