import { SubmitHandler, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./schema";
import { Input, Form } from 'rsuite';
import { StyledButton } from "../Button/Button";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

export const AgendamentoForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors }  
    } = useForm({
        resolver: zodResolver(registerFormSchema)
    });

    const { userRegister } = useContext(UserContext);

    const submit: SubmitHandler<FieldValues> = (formData) => {
        userRegister(formData);
    };

    return (
        <Form 
            onSubmit={(event) => {
                event!.preventDefault();
                handleSubmit(submit)();
            }} 
            noValidate
        >
            {/* <h2>Que ele venha aprender mais de Deus</h2> */}
            {/* <p>Que ele venha aprender mais de Deus!</p> */}

            <Form.Group controlId="crianca_nome">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control 
                    name="crianca_nome"
                    accepter={Input}
                    placeholder="Nome da criança"
                    // {...register("nome")}
                    onChange={(value, event) => register("crianca_nome").onChange(event)}
                    onBlur={register("crianca_nome").onBlur}
                    inputRef={register("crianca_nome").ref}
                />
                {errors.nome?.message && (
                <Form.HelpText style={{ color: "red" }}>
                    {String(errors.nome.message)}
                </Form.HelpText>
                )}
            </Form.Group>

            <Form.Group controlId="crianca_idade">
                <Form.ControlLabel>Idade</Form.ControlLabel>
                <Form.Control 
                    name="crianca_idade"
                    accepter={Input}
                    placeholder="Idade da criança"
                    // {...register("email")}
                    onChange={(value, event) => register("crianca_idade").onChange(event)}
                    onBlur={register("crianca_idade").onBlur}
                    inputRef={register("crianca_idade").ref}
                />
                {errors.nome?.message && (
                <Form.HelpText style={{ color: "red" }}>
                    {String(errors.nome.message)}
                </Form.HelpText>
                )}
            </Form.Group>

            <Form.Group controlId="responsavel_nome">
                <Form.ControlLabel>Senha</Form.ControlLabel>
                <Form.Control 
                    name="senha"
                    accepter={Input}
                    // type="password"
                    placeholder="Nome do responsável"
                    // {...register("senha")}
                    onChange={(value, event) => register("responsavel_nome").onChange(event)}
                    onBlur={register("responsavel_nome").onBlur}
                    inputRef={register("responsavel_nome").ref}
                />
                {errors.nome?.message && (
                <Form.HelpText style={{ color: "red" }}>
                    {String(errors.nome.message)}
                </Form.HelpText>
                )}
            </Form.Group>



            <Form.Group controlId="telefone">
                <Form.ControlLabel>Contato</Form.ControlLabel>
                <Form.Control 
                    name="telefone"
                    accepter={Input}
                    placeholder="Opção de contato"
                    // {...register("telefone")}
                    onChange={(value, event) => register("telefone").onChange(event)}
                    onBlur={register("telefone").onBlur}
                    inputRef={register("telefone").ref}
                />
                {errors.nome?.message && (
                <Form.HelpText style={{ color: "red" }}>
                    {String(errors.nome.message)}
                </Form.HelpText>
                )}
                </Form.Group>


                <Form.Group controlId="observacao">
                <Form.ControlLabel>Observação (opcional)</Form.ControlLabel>
                <Form.Control 
                    name="observacao"
                    accepter={Input}
                    // type="password"
                    placeholder="Alguma observação?"
                    // {...register("confirm")}
                    onChange={(value, event) => register("observacao").onChange(event)}
                    onBlur={register("observacao").onBlur}
                    inputRef={register("observacao").ref}
                />
                {errors.nome?.message && (
                <Form.HelpText style={{ color: "red" }}>
                    {String(errors.nome.message)}
                </Form.HelpText>
                )}
                </Form.Group>

            <StyledButton type="submit">Agendar</StyledButton>
        </Form>
    );
};


// import { SubmitHandler, FieldValues  } from "react-hook-form";
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerFormSchema, handlePhone } from "./schema";
// // import { Input } from "./Input";
// import { Input } from 'rsuite';
// import { Form } from 'rsuite';
// // import { Form } from "./style";
// import { StyledButton } from "../Button/Button";
// import { useContext } from "react";
// import { UserContext } from "../../providers/UserContext";


// export const ScheduleForm = () => {
//     const { 
//         register, 
//         handleSubmit, 
//         formState: {errors}  
//     } = useForm({
//         resolver: zodResolver(registerFormSchema)
//     });

//     const { userRegister } = useContext(UserContext)

//     const submit: SubmitHandler<FieldValues> = (formData) => {
//         userRegister(formData)
//     }

//     return(
//         <Form 
//             onSubmit={(event) => {
//                 event!.preventDefault(); // Evita comportamento padrão do HTML
//                 handleSubmit(submit)(); // Executa a submissão do react-hook-form
//             }} 
//             noValidate
//             >

//             <h2>Crie sua conta</h2>

//             <p>Rápido e grátis, vamos nessa!</p>

//             <Input 
//                 title="Nome" 
//                 type="text" 
//                 placeholder="Digite aqui seu nome" 
//                 {...register("nome")} 
//                 error={errors.nome as { message: string } | undefined}/>

//             <Input 
//                 title="Nome" 
//                 type="text" 
//                 placeholder="Digite aqui seu nome" 
//                 {...register("nome")} 
//                 error={errors.nome as { message: string } | undefined}/>

//             <Input 
//                 title="Email" 
//                 type="email" 
//                 placeholder="Digite aqui seu email" 
//                 {...register("email")} 
//                 error={errors.email as { message: string } | undefined}/>

//             <Input 
//                 title="Senha" 
//                 type="password" 
//                 placeholder="Digite aqui sua senha" 
//                 {...register("senha")} 
//                 error={errors.senha as { message: string } | undefined}/>

//             <Input 
//                 title="Confirmar senha" 
//                 type="password" 
//                 placeholder="Digite novamente sua senha" 
//                 {...register("confirm")} 
//                 error={errors.nome as { message: string } | undefined}/>

//             <Input 
//                 title="Contato" 
//                 type="text" 
//                 // onKeyUp={
//                 //     handlePhone
//                 //   }
//                 placeholder="Opção de contato" 
//                 {...register("telefone")} 
//                 error={errors.telefone as { message: string } | undefined}/>


//             <StyledButton type="submit">Cadastrar</StyledButton>
//         </Form>
//     )
// }