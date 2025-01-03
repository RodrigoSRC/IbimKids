import { ProfService } from "../services/professores.service";
import { ProfsController } from "./professores.controller";
import { SessionService } from "../services/session.service";
import { SessionController } from "./session.controller";
import { AgendamentoController } from "./agendamentos.controllers";
import { AgendamentoService } from "../services/agendamentos.service";
import { EscalaController } from "./escala.controllers";
import { EscalaService } from "../services/escala.service";
import { ClientService } from "../services/clients.service";
import { ClientsController } from "./clients.controllers";

const profsService = new ProfService()
const profsController = new ProfsController(profsService)

const sessionService = new SessionService()
const sessionController = new SessionController(sessionService)

const agendamentoService = new AgendamentoService()
const agendamentoController = new AgendamentoController(agendamentoService)

const escalaService = new EscalaService()
const escalaController = new EscalaController(escalaService)

const clientService = new ClientService
const clientsController = new ClientsController(clientService)

export {profsController, sessionController, agendamentoController, clientsController, escalaController}