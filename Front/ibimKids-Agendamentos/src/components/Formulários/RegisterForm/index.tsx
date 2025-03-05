import { SubmitHandler, FieldValues  } from "react-hook-form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./schema";

import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";
import { Button, Input, Form, InputGroup } from "rsuite";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";


export const RegisterForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: {errors},
        setValue  
    } = useForm({
        resolver: zodResolver(registerFormSchema)
    });

    const { userRegister } = useContext(UserContext)
    const [visible, setVisible] = useState(false);
    const [senha, setSenha] = useState("");
    const [confirm, setConfirm] = useState("");
    
    const handleChange = () => {
        setVisible(!visible);
    };

    const submit: SubmitHandler<FieldValues> = (formData) => {
        userRegister(formData)
    }

    return(
        <Form
        onSubmit={(_, event) => {
          event?.preventDefault();
          handleSubmit(submit)();
        }}
        noValidate
      >
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

            <InputGroup inside>
                    <Input
                        title="senha"
                        type={visible ? "text" : "password"}
                        value={senha}
                        onChange={(value) => {
                        setSenha(value);
                        setValue("senha", value);
                        }}
                        placeholder="Digite aqui sua senha"
                    />
                    <InputGroup.Button onClick={handleChange}>
                        {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                    </InputGroup>

            <InputGroup inside>
                    <Input
                        title="senha"
                        type={visible ? "text" : "password"}
                        value={confirm}
                        onChange={(value) => {
                        setConfirm(value);
                        setValue("confirm", value);
                        }}
                        placeholder="Confirme aqui sua senha"
                    />
                    <InputGroup.Button onClick={handleChange}>
                        {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                    </InputGroup>
                    

            <Input 
                title="Contato" 
                type="text" 
                placeholder="Opção de contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>


            <Button appearance="primary" type="submit">Cadastrar</Button>
        </Form>
    )
}