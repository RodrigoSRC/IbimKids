import { Route, Routes } from "react-router-dom"
import { RegisterPage } from "../pages/Register"
import { LoginPage } from "../pages/Login"
import { HomePage } from "../pages/Home"
import { AgendamentoPage } from "../pages/Agendamento"
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