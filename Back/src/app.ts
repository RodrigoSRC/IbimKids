import 'express-async-errors'
import express, { Application } from "express";
import { handleAppErrorMiddleware } from './middlewares/handleAppError.middleware';
import { clientsRoutes } from './routes/clients.routes';
import { profsRoutes } from './routes/professores.routes';
import { sessionRouter } from './routes/session.routes';
import { agendamentoRoutes } from './routes/agendamentos.routes';
import { escalaRoutes } from './routes/escalas.routes';


export const app: Application = express()
const cors = require('cors');



app.use(cors());

app.use(express.json())
app.use('/clients', clientsRoutes)
app.use('/professores', profsRoutes)
app.use('/agendamentos', agendamentoRoutes)
app.use('/escalas', escalaRoutes)
app.use('/login', sessionRouter)


app.use(handleAppErrorMiddleware)

export default app