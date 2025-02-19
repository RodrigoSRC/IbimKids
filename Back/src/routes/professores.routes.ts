import { Router } from "express";
import { profsController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { profSchemaRequest } from "../schemas/professores.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const profsRoutes = Router()

profsRoutes.use(ensureAuthMiddleware)

profsRoutes.post("", ensureDataIsValidMiddleware(profSchemaRequest), (req, res) => profsController.create(req, res))

profsRoutes.get("", (req, res) => profsController.list(req, res))

profsRoutes.patch("/:id", ensureDataIsValidMiddleware(profSchemaRequest),
(req, res) => profsController.update(req, res))

profsRoutes.delete("/:id", (req, res) => profsController.remove(req, res))

export {profsRoutes}