import { SubmitHandler  } from "react-hook-form";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../RegisterForm/Input";
import { loginFormSchema } from "./loginFormSchema";
import { Form } from "./style";
import { StyledButton } from "../Button/Button";

import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

import { StyledParagraph, StyledTitle } from "../../styles/typography";



interface LoginFormValues {
    email: string;
    senha: string;
  }


export const LoginForm = () => {

    const { userLogin } = useContext(UserContext);

    const { 
        register, 
        handleSubmit, 
        formState: {errors}  
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema)
    });


    const submit: SubmitHandler<LoginFormValues> = (formData) => {
        console.log(formData)
        userLogin(formData)
    }


    return(
        <Form onSubmit={handleSubmit(submit)} noValidate>
            <StyledTitle fontWeight="bold">Login</StyledTitle>

            <Input 
                title="Email" 
                type="email" 
                placeholder="Digite aqui seu email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/>

            <Input 
                title="Senha" 
                type="password" 
                placeholder="Digite aqui sua senha" 
                {...register("senha")} 
                error={errors.senha as { message: string } | undefined}/>

            <StyledButton tp="login" type="submit">Entrar</StyledButton>

            <StyledParagraph>Ainda não possui uma conta?</StyledParagraph>

            <Link to="/register">Cadastre-se</Link>

        </Form>
    )
}