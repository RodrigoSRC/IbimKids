import { Route, Routes } from "react-router-dom"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { AgendamentoPage } from "../pages/AgendamentoPage"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { PublicRoutes } from "./PublicRoutes" 

export const RoutesMain = () => {

    return(
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/agendamento" element={<AgendamentoPage />}/>
            </Route>

            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<HomePage/>}/>
            </Route>
        </Routes>
    )
}