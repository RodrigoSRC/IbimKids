import { Router } from "express";
import { escalaController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { profSchemaRequest } from "../schemas/professores.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const escalaRoutes = Router()

escalaRoutes.use(ensureAuthMiddleware)

escalaRoutes.post("", ensureDataIsValidMiddleware(profSchemaRequest), (req, res) => escalaController.create(req, res))

escalaRoutes.get("/:id", (req, res) => escalaController.list(req, res))

escalaRoutes.patch("/:id", ensureDataIsValidMiddleware(profSchemaRequest),
(req, res) => escalaController.update(req, res))

escalaRoutes.delete("/:id", (req, res) => escalaController.remove(req, res))

export {escalaRoutes}