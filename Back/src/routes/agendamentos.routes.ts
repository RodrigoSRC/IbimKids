import { Router } from "express";
import { agendamentoController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { agendamentoSchemaRequest } from "../schemas/agendamentos.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const agendamentoRoutes = Router()

agendamentoRoutes.post("", ensureDataIsValidMiddleware(agendamentoSchemaRequest), (req, res) => agendamentoController.create(req, res))

agendamentoRoutes.get("", (req, res) => agendamentoController.list(req, res))

agendamentoRoutes.use(ensureAuthMiddleware)

agendamentoRoutes.get("/:id", (req, res) => agendamentoController.find(req, res))

agendamentoRoutes.patch("/:id", ensureDataIsValidMiddleware(agendamentoSchemaRequest),
(req, res) => agendamentoController.update(req, res))

agendamentoRoutes.delete("/:id", (req, res) => agendamentoController.remove(req, res))

export {agendamentoRoutes}