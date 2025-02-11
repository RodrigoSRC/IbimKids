import { Router } from "express";
import { agendamentoController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { profSchemaRequest } from "../schemas/professores.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const agendamentoRoutes = Router()

agendamentoRoutes.post("", ensureDataIsValidMiddleware(profSchemaRequest), (req, res) => agendamentoController.create(req, res))

agendamentoRoutes.use(ensureAuthMiddleware)

agendamentoRoutes.get("", (req, res) => agendamentoController.list(req, res))

agendamentoRoutes.get("/:id", (req, res) => agendamentoController.find(req, res))

agendamentoRoutes.patch("/:id", ensureDataIsValidMiddleware(profSchemaRequest),
(req, res) => agendamentoController.update(req, res))

agendamentoRoutes.delete("/:id", (req, res) => agendamentoController.remove(req, res))

export {agendamentoRoutes}