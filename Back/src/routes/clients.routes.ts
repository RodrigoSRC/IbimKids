import { Router } from "express";
import { clientsController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientSchemaRequest } from "../schemas/clients.schemas";

const clientsRoutes = Router()

clientsRoutes.post("", ensureDataIsValidMiddleware(clientSchemaRequest), (req, res) => clientsController.create(req, res))

clientsRoutes.get("/:id", (req, res) => clientsController.list(req, res))

clientsRoutes.patch("/:id", ensureDataIsValidMiddleware(clientSchemaRequest), (req, res) => clientsController.update(req, res))

clientsRoutes.delete("/:id", (req, res) => {clientsController.remove(req, res)})



export {clientsRoutes}