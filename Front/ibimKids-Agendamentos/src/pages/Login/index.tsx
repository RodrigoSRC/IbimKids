
import { LoginForm } from "../../components/Formulários/LoginForm"
import { StyledContainer } from "./style"
import { StyledLogo } from "../../styles/typography"

export const LoginPage = () => {
    return(
        <StyledContainer>
            <div className="formBox">
                <StyledLogo>IBIM <span> Kids</span> Agendamentos</StyledLogo>

                <LoginForm/>
            </div>
        </StyledContainer>
    )
}