import { Link } from "react-router-dom"
import { AgendamentoForm } from "../../components/Formulários/AddAgendamento"
import { StyledContainer } from "./style"
import { StyledLogo } from "../../styles/typography"


export const AgendamentoPage = () => {
    return(
        <StyledContainer>
            <div className="formBox">
                <div className="navBar">
                    <StyledLogo>Ibim <span>Kids</span> Agendamentos</StyledLogo>

                    <Link to="/">Voltar</Link>
                </div>

                <AgendamentoForm/>
            </div>

        </StyledContainer>
    )
}