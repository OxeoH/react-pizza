import { Client } from "../client/client.entity";

export interface CreateOrderParams{
    description: string,
    price: number,
    clientId: Client
}