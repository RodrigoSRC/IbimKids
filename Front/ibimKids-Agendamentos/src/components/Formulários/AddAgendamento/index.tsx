// import { SubmitHandler, FieldValues } from "react-hook-form";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agendamentoSchema, TAgendamentoSchema } from "./schema";
import { Input, Form, DatePicker, SelectPicker, Button, Radio, RadioGroup } from 'rsuite';
// import { StyledButton } from "../../Button/Button";
import { useContext, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { AgendamentosListContext } from "../../../providers/AgendamentosListContext"
import isBefore from 'date-fns/isBefore';

export const AgendamentoForm = () => {
    const { 
        register, 
        handleSubmit, 
        // watch, 
        // setValue,
        formState: { errors }  
    } = useForm({
        resolver: zodResolver(agendamentoSchema)
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

    const { addAgendamento } = useContext(AgendamentosListContext);

    const [escalas, setEscalas] = useState<Escala[]>([]);
    const [datasDisponiveis, setDatasDisponiveis] = useState<string[]>([]);
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
    const [turnosDisponiveis, setTurnosDisponiveis] = useState<string[]>([]);
    const [turnoSelecionado, setTurnoSelecionado] = useState<string | null>(null);
    const [faixaEtariaDisponivel, setFaixaEtariaDisponivel] = useState<string[]>([]);
    const [faixaEtaria, setfaixaEtaria] = useState<string | null>(null);

    useEffect(() => {
        const fetchEscalas = async () => {
            try {
                const { data } = await api.get<Escala[]>("/escalas");
                console.log(data)

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

    
    // Atualiza os turnos ao selecionar uma data
    useEffect(() => {
        if (dataSelecionada) {
            console.log(escalas)
            const turnos = escalas
                .filter(item => item.data_escala === dataSelecionada)
                .map(item => item.data_turno);
            // console.log(dataSelecionada)
            setTurnosDisponiveis(Array.from(new Set(turnos))); // Remove duplicatas
            console.log(turnosDisponiveis)

            // const faixaEtaria = escalas
            //     .filter(item => item.faixa_etaria === dataSelecionada)
            //     .map(item => item.faixa_etaria);
            // // console.log(dataSelecionada)
            // setFaixaEtariaDisponivel(Array.from(new Set(faixaEtaria))); // Remove duplicatas
            // console.log(faixaEtariaDisponivel)
        } else {
            setTurnosDisponiveis([]);
        }
    }, [dataSelecionada, escalas]);



    const findEscala = (dataSelecionada: string | null, turnoSelecionado: string | null, faixaEtaria: string | null) => {
        if (!dataSelecionada || !turnoSelecionado || !faixaEtaria) return null;
        // console.log(escalas)
        return escalas.find(escala => escala.data_escala === dataSelecionada && escala.data_turno === turnoSelecionado && escala.faixa_etaria === faixaEtaria);
    };

    const createAgendamento: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const escalaSelecionada = findEscala(dataSelecionada, turnoSelecionado, faixaEtaria);
    
        if (escalaSelecionada) {
            const formData = {
                ...data,
                escalaId: escalaSelecionada.id, // Incluindo o ID da escala no formData
            };
            addAgendamento(formData);
        } else {
            console.error("Escala não encontrada para a data e turno selecionados");
        }
    };
    

    return (

            <Form 
                onSubmit={(_, event) => {
                    event?.preventDefault();
                    handleSubmit(createAgendamento)();
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


            <Form.Group controlId="faixa_etaria">
            <RadioGroup
                    name="faixa_etaria"
                    inline
                    value={faixaEtaria ?? undefined} // Certifica que o valor selecionado está atualizado
                    onChange={(value) => setfaixaEtaria(value as string)}
                    
            >
                <Radio value="BERÇARIO">1 a 3 anos</Radio>
                <Radio value="INFANTIL">3 a 5 anos</Radio>
                <Radio value="JUVENIL">5 a 10 anos</Radio>
            </RadioGroup>
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
                    value={turnoSelecionado}  // Estado para o turno selecionado
                    onChange={(value) => setTurnoSelecionado(value)} // Atualiza o estado ao selecionar o turno
                />
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

            <Button appearance="primary" type="submit">Agendar</Button>
        </Form>
    );
};
