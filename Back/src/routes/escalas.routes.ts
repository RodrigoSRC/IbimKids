import { Router } from "express";
import { escalaController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
// import { profSchemaRequest } from "../schemas/professores.schemas";
import { escalaSchema } from "../schemas/escalas.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const escalaRoutes = Router()

escalaRoutes.use(ensureAuthMiddleware)

escalaRoutes.post("", ensureDataIsValidMiddleware(escalaSchema), (req, res) => escalaController.create(req, res))

// escalaRoutes.get("/all", (req, res) => escalaController.list(req, res))
escalaRoutes.get("", (req, res) => escalaController.listAll(req, res));

escalaRoutes.get("/:id", (req, res) => escalaController.list(req, res))

escalaRoutes.patch("/:id", ensureDataIsValidMiddleware(escalaSchema),
(req, res) => escalaController.update(req, res))

escalaRoutes.delete("/:id", (req, res) => escalaController.remove(req, res))

export {escalaRoutes}