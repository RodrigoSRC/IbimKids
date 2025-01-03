import 'dotenv/config'
import { AppDataSource } from "./data-source";
import { app } from './app';

AppDataSource.initialize()
  .then((): void => {
    console.log('Database Conectado')

    const PORT: number = Number(process.env.PORT)
    app.listen(PORT, (): void => console.log(`App rodando na Porta ${PORT}`))
  })
  .catch((err)=> console.log(err))