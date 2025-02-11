// import { SubmitHandler, FieldValues } from "react-hook-form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerFormSchema } from "./schema";
// import { Input, Form } from 'rsuite';
// import { StyledButton } from "../Button/Button";
// import { useContext } from "react";
// import { UserContext } from "../../providers/UserContext";

// export const RegisterForm = () => {
//     const { 
//         register, 
//         handleSubmit, 
//         formState: { errors }  
//     } = useForm({
//         resolver: zodResolver(registerFormSchema)
//     });

//     const { userRegister } = useContext(UserContext);

//     const submit: SubmitHandler<FieldValues> = (formData) => {
//         userRegister(formData);
//     };

//     return (
//         <Form 
//             onSubmit={(event) => {
//                 event!.preventDefault();
//                 handleSubmit(submit)();
//             }} 
//             noValidate
//         >
//             <h2>Crie sua conta</h2>
//             <p>Rápido e grátis, vamos nessa!</p>

//             <Form.Group controlId="nome">
//                 <Form.ControlLabel>Nome</Form.ControlLabel>
//                 <Form.Control 
//                     name="nome"
//                     accepter={Input}
//                     placeholder="Digite aqui seu nome"
//                     // {...register("nome")}
//                     onChange={(value, event) => register("nome").onChange(event)}
//                     onBlur={register("nome").onBlur}
//                     inputRef={register("nome").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//             </Form.Group>

//             <Form.Group controlId="email">
//                 <Form.ControlLabel>Email</Form.ControlLabel>
//                 <Form.Control 
//                     name="email"
//                     accepter={Input}
//                     placeholder="Digite aqui seu email"
//                     // {...register("email")}
//                     onChange={(value, event) => register("email").onChange(event)}
//                     onBlur={register("email").onBlur}
//                     inputRef={register("email").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//             </Form.Group>

//             <Form.Group controlId="senha">
//                 <Form.ControlLabel>Senha</Form.ControlLabel>
//                 <Form.Control 
//                     name="senha"
//                     accepter={Input}
//                     type="password"
//                     placeholder="Digite aqui sua senha"
//                     // {...register("senha")}
//                     onChange={(value, event) => register("email").onChange(event)}
//                     onBlur={register("email").onBlur}
//                     inputRef={register("email").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//             </Form.Group>

//             <Form.Group controlId="confirm">
//                 <Form.ControlLabel>Confirmar senha</Form.ControlLabel>
//                 <Form.Control 
//                     name="confirm"
//                     accepter={Input}
//                     type="password"
//                     placeholder="Digite novamente sua senha"
//                     // {...register("confirm")}
//                     onChange={(value, event) => register("confirm").onChange(event)}
//                     onBlur={register("confirm").onBlur}
//                     inputRef={register("confirm").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//                 </Form.Group>

//             <Form.Group controlId="telefone">
//                 <Form.ControlLabel>Contato</Form.ControlLabel>
//                 <Form.Control 
//                     name="telefone"
//                     accepter={Input}
//                     placeholder="Opção de contato"
//                     // {...register("telefone")}
//                     onChange={(value, event) => register("telefone").onChange(event)}
//                     onBlur={register("telefone").onBlur}
//                     inputRef={register("telefone").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//                 </Form.Group>

//             <StyledButton type="submit">Cadastrar</StyledButton>
//         </Form>
//     );
// };

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
                placeholder="Opção de contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>


            <StyledButton type="submit">Cadastrar</StyledButton>
        </Form>
    )
}