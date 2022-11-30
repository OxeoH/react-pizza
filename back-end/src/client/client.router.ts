import { Request, Response, Router } from "express";
import ClientController from "./client.controller";

const clientRouter = Router()

clientRouter.get("/", async (req: Request, res: Response) => {
    await ClientController.getAllClients(req, res)
})

clientRouter.get("/:id", async (req: Request, res: Response) => {
    await ClientController.getOneClient(req, res)
})

clientRouter.delete("/:id", async (req: Request, res: Response) => {
    await ClientController.deleteClient(req, res)
})

clientRouter.post("/", async (req: Request, res: Response) => {
    await ClientController.createClient(req, res)
})

clientRouter.put("/", async (req: Request, res: Response) => {
    await ClientController.updateClient(req, res)
})

export default clientRouter