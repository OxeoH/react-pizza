import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    address: string
}