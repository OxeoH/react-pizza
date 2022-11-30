import { Request, Response } from "express";
import ClientService from "./client.service";
import { CreateClientParams } from "./client.types";



class ClientController{

    public async getAllClients(req: Request, res: Response){
        try{
            const allClients = await ClientService.getClients();
            res.json(allClients)
        }catch(e){
            console.log(e);
            res.status(500).json({message: "Server error"})
        }
    }

    public async createClient(req: Request, res: Response){
        try{
            const client: CreateClientParams = req.body
            
            const createdClient = await ClientService.createClient(client);

            res.json(createdClient)
        }catch(e){
            console.log(e)
            res.status(500).json({message: "Unexpected error"})
        }
    }

    public async getOneClient(req: Request, res: Response){
        try{
            const {id} = req.params
            if(!id){
                res.status(500).json({message: "There is no ID"})
            }
            const client = await ClientService.getClientById(id)
            res.json(client)
        }catch(e){
            console.log(e)
            res.status(500).json({message: "Unexpected error"})
        }
    }

    public async deleteClient(req: Request, res: Response){
        try{
            const {id} = req.params
            if(!id){
                res.status(500).json({message: "There is no ID"})
            }
            const deletedClient = await ClientService.deleteOneById(id)
            res.json(deletedClient)
        }catch(e){
            console.log(e)
            res.status(500).json({message: "Unexpected error"})
        }
    }

    public async updateClient(req: Request, res: Response){
        try{
            const newClient = req.body
            if(!newClient.id){
                res.status(500).json({message: "There is no ID"})
            }
            const updatedClient = await ClientService.updateOneById(newClient)//???????????????????????????????????????????????
            res.json(updatedClient);
        }catch(e){
            console.log(e)
            res.status(500).json({message: "Unexpected error"})
        }
    }
    
}

export default new ClientController;