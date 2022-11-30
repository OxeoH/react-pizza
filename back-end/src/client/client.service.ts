import { Repository } from "typeorm";
import AppDataSource from "../data-source"
import { Client } from "./client.entity";
import { CreateClientParams } from "./client.types";

class ClientService{
    clientRepository: Repository<Client>

    constructor(){
        this.clientRepository = AppDataSource.getRepository<Client>(Client);
    }
    public async createClient(clientInfo: CreateClientParams): Promise<Client>{
        const newClient = new Client()
        newClient.name = clientInfo.name
        newClient.phone = clientInfo.phone
        newClient.address = clientInfo.address

        const savedClient = await this.clientRepository.save(newClient)

        return savedClient
    }

    public async getClients(): Promise<Client[]>{
        const clients = await this.clientRepository.find()
        return clients
    }

    public async getClientById(clientId: string){
        const client = await this.clientRepository.findOneBy({id: clientId});
        return client
    }

    public async deleteOneById(clientId: string){
        const deletedClient = await this.clientRepository.delete({id: clientId})
        return deletedClient
    }
    public async updateOneById(client){
        const updatedClient = await this.clientRepository.update(client.id, client)
    }
}

export default new ClientService