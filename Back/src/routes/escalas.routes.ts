import { Router } from "express";
import { escalaController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { escalaSchema, escalaSchemaRequest } from "../schemas/escalas.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const escalaRoutes = Router()

escalaRoutes.get("", (req, res) => escalaController.list(req, res))

escalaRoutes.use(ensureAuthMiddleware)

escalaRoutes.post("", ensureDataIsValidMiddleware(escalaSchemaRequest), (req, res) => escalaController.create(req, res))

escalaRoutes.get("/:id", (req, res) => escalaController.find(req, res))

escalaRoutes.patch("/:id", ensureDataIsValidMiddleware(escalaSchemaRequest),
(req, res) => escalaController.update(req, res))

escalaRoutes.delete("/:id", (req, res) => escalaController.remove(req, res))

export {escalaRoutes}