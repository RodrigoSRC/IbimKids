import { SubmitHandler, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agendamentoFormSchema } from "./schema";
import { Input, Form, DatePicker, SelectPicker } from 'rsuite';
import { StyledButton } from "../Button/Button";
import { useContext, useEffect, useState } from "react";
// import { TAgendameno}
import { api } from "../../services/api";
import { AgendamentosListContext } from "../../providers/AgendamentosListContext"
import isBefore from 'date-fns/isBefore';

export const AgendamentoForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors }  
    } = useForm({
        resolver: zodResolver(agendamentoFormSchema)
    });

    interface Escala {
        id: string;
        crianca_nome: string;
        data_escala: string;
        data_registrada: string;
        data_turno: string;
        descricao: string;
        faixa_etaria: string;
        limite: string;
        
    }
    

    // const { userRegister } = useContext(UserContext);

    const submit: SubmitHandler<FieldValues> = (formData) => {
        // userRegister(formData);
    };



    const { addAgendamento } = useContext(AgendamentosListContext);

    const [escalas, setEscalas] = useState<Escala[]>([]);
    const [datasDisponiveis, setDatasDisponiveis] = useState<string[]>([]);
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
    const [turnosDisponiveis, setTurnosDisponiveis] = useState<string[]>([]);

    useEffect(() => {
        const fetchEscalas = async () => {
            try {
                const { data } = await api.get<Escala[]>("/escalas");
                setEscalas(data);

                // Extrai datas únicas disponíveis
                const datasUnicas = Array.from(new Set(data.map(item => item.data_escala)));
                setDatasDisponiveis(datasUnicas);
            } catch (error) {
                console.error("Erro ao buscar datas:", error);
            }
        };

        fetchEscalas();
    }, []);

    const createAgendamento = async (data: TEscalaSchema) => {
        const formData = {
          ...data,
          // professorIds, // Incluindo os IDs dos professores selecionados
        };
        
        addAgendamento(formData);
        // setIsOpenAddEscala(false);
      };

    // Atualiza os turnos ao selecionar uma data
    useEffect(() => {
        if (dataSelecionada) {
            const turnos = escalas
                .filter(item => item.data_escala === dataSelecionada)
                .map(item => item.data_turno);
            
            setTurnosDisponiveis(Array.from(new Set(turnos))); // Remove duplicatas
        } else {
            setTurnosDisponiveis([]);
        }
    }, [dataSelecionada, escalas]);
    

    return (
        // <Form 
        //     onSubmit={(event) => {
        //         // event!.preventDefault();
        //         handleSubmit(submit)();
        //     }} 
        //     noValidate
        // >
        <Form 
            onSubmit={(formValue, event) => {
                event?.preventDefault(); // ✅ Garante que previna o comportamento padrão do form
                handleSubmit(submit)();  // ✅ Chama a função correta do react-hook-form
            }}
            noValidate
        >



            <Form.Group controlId="crianca_nome">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control 
                    name="crianca_nome"
                    accepter={Input}
                    placeholder="Informe o nome da criança"
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

             <Form.Group controlId="responsavel_nome">
                 <Form.ControlLabel>Nome do Responsável</Form.ControlLabel>
                 <Form.Control 
                    name="responsavel_nome"
                    accepter={Input}
                    placeholder="Informe o nome do responsável"
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

            <Form.Group controlId="crianca_idade">
                <Form.ControlLabel>Idade</Form.ControlLabel>
                <Form.Control 
                    name="crianca_idade"
                    accepter={Input}
                    placeholder="Idade da criança"
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


            <Form.Group controlId="telefone">
                <Form.ControlLabel>Contato</Form.ControlLabel>
                <Form.Control 
                    name="telefone"
                    accepter={Input}
                    placeholder="Opção de contato"
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
                    placeholder="Alguma observação?"
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

                <Form.Group controlId="date">
                <Form.ControlLabel>Data agendada</Form.ControlLabel>
                <DatePicker 
    format="dd/MM/yyyy"
    placeholder="dia/mês/ano" 
    oneTap
    defaultValue={new Date()} 
    shouldDisableDate={date => isBefore(date, new Date())}
    value={dataSelecionada ? new Date(dataSelecionada) : null}
    onChange={(date: Date | null) => 
        setDataSelecionada(date ? date.toISOString().split('T')[0] : null)
    }
    renderCell={(date) => {
        const dateString = date.toISOString().split('T')[0]; 
        const isAvailable = datasDisponiveis.includes(dateString);

        return (
            <div style={{
                border: isAvailable ? '2px solid #4CAF50' : 'none',
                borderRadius: '5px',
                padding: '5px',
                backgroundColor: isAvailable ? '#e8f5e9' : 'transparent'
            }}>
                {date.getDate()}
            </div>
        );
    }}
/>

            </Form.Group>

            <Form.Group controlId="turno">
                <Form.ControlLabel>Turno desejado</Form.ControlLabel>
                <SelectPicker 
                    data={turnosDisponiveis.map(turno => ({ label: turno, value: turno }))}
                    disabled={!dataSelecionada}
                    placeholder="Selecione um turno"
                />
            </Form.Group>

            {/* <Form.Group controlId="date">
                <Form.ControlLabel>Data agendada</Form.ControlLabel>
                <DatePicker 
                    format="dd/MM/yyyy"
                    placeholder="dia/mês/ano" 
                    oneTap
                    
                    defaultValue={new Date()} 
                    shouldDisableDate={date => isBefore(date, new Date())}
                    value={dataSelecionada ? new Date(dataSelecionada) : null} // ✅ Converter string para Date
                    onChange={(date: Date | null) => 
                        setDataSelecionada(date ? date.toISOString().split('T')[0] : null)
                    }
                />

            </Form.Group>

            <Form.Group controlId="turno">
                <Form.ControlLabel>Turno desejado</Form.ControlLabel>
                <SelectPicker 
                    data={turnosDisponiveis.map(turno => ({ label: turno, value: turno }))}
                    disabled={!dataSelecionada}
                    placeholder="Selecione um turno"
                />
            </Form.Group> */}

            <StyledButton type="submit">Agendar</StyledButton>
        </Form>
    );
};



// import { SubmitHandler, FieldValues } from "react-hook-form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerFormSchema } from "./schema";
// import { Input, Form, DatePicker } from 'rsuite';
// import { StyledButton } from "../Button/Button";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../providers/UserContext";
// import { api }from "../../services/api";

// export const AgendamentoForm = () => {
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

//     const [escalas, setEscalas] = useState([])

//       useEffect(() => {
//         const fetchEscalas = async () => {
//           try {
//             const { data } = await api.get("/escalas");
//             console.log(data)
//             setEscalas(data);
    
//           } catch (error) {
//             console.error("Erro ao buscar datas:", error);
//           }
//         };
    
//         fetchEscalas();
//       }, []);

//     return (
//         <Form 
//             onSubmit={(event) => {
//                 event!.preventDefault();
//                 handleSubmit(submit)();
//             }} 
//             noValidate
//         >

//             <Form.Group controlId="crianca_nome">
//                 <Form.ControlLabel>Nome</Form.ControlLabel>
//                 <Form.Control 
//                     name="crianca_nome"
//                     accepter={Input}
//                     placeholder="Informe o nome da criança"
//                     onChange={(value, event) => register("crianca_nome").onChange(event)}
//                     onBlur={register("crianca_nome").onBlur}
//                     inputRef={register("crianca_nome").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//             </Form.Group>

//             <Form.Group controlId="responsavel_nome">
//                 <Form.ControlLabel>Nome do Responsável</Form.ControlLabel>
//                 <Form.Control 
//                     name="responsavel_nome"
//                     accepter={Input}
//                     placeholder="Informe o nome do responsável"
//                     onChange={(value, event) => register("responsavel_nome").onChange(event)}
//                     onBlur={register("responsavel_nome").onBlur}
//                     inputRef={register("responsavel_nome").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//             </Form.Group>

//             <Form.Group controlId="crianca_idade">
//                 <Form.ControlLabel>Idade</Form.ControlLabel>
//                 <Form.Control 
//                     name="crianca_idade"
//                     accepter={Input}
//                     placeholder="Idade da criança"
//                     onChange={(value, event) => register("crianca_idade").onChange(event)}
//                     onBlur={register("crianca_idade").onBlur}
//                     inputRef={register("crianca_idade").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//             </Form.Group>


//             <Form.Group controlId="telefone">
//                 <Form.ControlLabel>Contato</Form.ControlLabel>
//                 <Form.Control 
//                     name="telefone"
//                     accepter={Input}
//                     placeholder="Opção de contato"
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


//                 <Form.Group controlId="observacao">
//                 <Form.ControlLabel>Observação (opcional)</Form.ControlLabel>
//                 <Form.Control 
//                     name="observacao"
//                     accepter={Input}
//                     placeholder="Alguma observação?"
//                     onChange={(value, event) => register("observacao").onChange(event)}
//                     onBlur={register("observacao").onBlur}
//                     inputRef={register("observacao").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//                 </Form.Group>

//                 <Form.Group controlId="date">
//                 <Form.ControlLabel>Data agendada</Form.ControlLabel>
//                     <DatePicker format="dd.MM.yyyy" />  

//                 </Form.Group>

//                 <Form.Group controlId="turno">
//                 <Form.ControlLabel>Turno desejado</Form.ControlLabel>
//                 <Form.Control 
//                     name="observacao"
//                     accepter={Input}
//                     placeholder="Alguma observação?"
//                     onChange={(value, event) => register("observacao").onChange(event)}
//                     onBlur={register("observacao").onBlur}
//                     inputRef={register("observacao").ref}
//                 />
//                 {errors.nome?.message && (
//                 <Form.HelpText style={{ color: "red" }}>
//                     {String(errors.nome.message)}
//                 </Form.HelpText>
//                 )}
//                 </Form.Group>

//             <StyledButton type="submit">Agendar</StyledButton>
//         </Form>
//     );
// };


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