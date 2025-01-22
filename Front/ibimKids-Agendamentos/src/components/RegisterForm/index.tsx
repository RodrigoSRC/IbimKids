import { SubmitHandler, FieldValues  } from "react-hook-form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, handlePhone } from "./schema";
import { Input } from "./Input";
import { Form } from "./style";
import { StyledButton } from "../Button/Button";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";


export const RegisterForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: {errors}  
    } = useForm({
        resolver: zodResolver(registerFormSchema)
    });

    const { userRegister } = useContext(UserContext)

    const submit: SubmitHandler<FieldValues> = (formData) => {
        console.log(formData)
        userRegister(formData)
    }

    return(
        <Form onSubmit={handleSubmit(submit)} noValidate>
            <h2>Crie sua conta</h2>

            <p>Rápido e grátis, vamos nessa!</p>

            <Input 
                title="Nome" 
                type="text" 
                placeholder="Digite aqui seu nome" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}/>

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

            <Input 
                title="Confirmar senha" 
                type="password" 
                placeholder="Digite novamente sua senha" 
                {...register("confirm")} 
                error={errors.nome as { message: string } | undefined}/>

            <Input 
                title="Contato" 
                type="text" 
                onKeyUp={
                    handlePhone
                  }
                placeholder="Opção de contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>


            <StyledButton type="submit">Cadastrar</StyledButton>
        </Form>
    )
}