import { Link } from "react-router-dom"
import { RegisterForm } from "../../components/RegisterForm"
import { StyledContainer } from "./style"
import { StyledLogo } from "../../styles/typography"


export const RegisterPage = () => {
    return(
        <StyledContainer>
            <div className="formBox">
                <div className="navBar">
                    <StyledLogo>Ibim <span>Kids</span> Escalas</StyledLogo>

                    <Link to="/">Voltar</Link>
                </div>

                <RegisterForm/>
            </div>

        </StyledContainer>
    )
}