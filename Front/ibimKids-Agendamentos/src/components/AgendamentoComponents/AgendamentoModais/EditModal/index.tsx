import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TAgendamentoSchema, agendamentoSchema, handlePhone } from "./schema"
import { Modal } from "../../../ProfessoresComponents/ProfessoresModals/Modal"
import { AgendamentosListContext } from "../../../../providers/AgendamentosListContext"
import { Form } from "./style"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"
// import { handlePhone } from "./schema"


interface ModalEditTaskProps {
    toggleModalAgendamento: () => void;
    setIsOpenEditAgendamento: Dispatch<SetStateAction<boolean>>;
    agendamentoId: string;
  }


export const EditAgendamentoModal = ({ toggleModalAgendamento, setIsOpenEditAgendamento, agendamentoId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TAgendamentoSchema>({
    resolver: zodResolver(agendamentoSchema)
})
  const { editAgendamento, agendamentos } = useContext(AgendamentosListContext)

  const currentAgendamento = agendamentos.find(agendamento => agendamento.id === agendamentoId)


  const onSubmit = async (data: TAgendamentoSchema, e: any) => {
    console.log("submit")
    e.preventDefault()
    try {
      // console.log(2)
      await editAgendamento(data, agendamentoId);
      setIsOpenEditAgendamento(false);
    } catch (error) {
      console.error("Erro ao editar o agendamento", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalAgendamento}>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <StyledTitle>Edite o agendamento</StyledTitle>
            <Input 
                title="nome da criança" 
                type="text" 
                defaultValue={currentAgendamento!.crianca_nome}
                placeholder="Digite aqui o nome da criança" 
                {...register("crianca_nome")} 
                error={errors.crianca_nome as { message: string } | undefined}/>
            <Input 
                title="idade" 
                type="text" 
                defaultValue={currentAgendamento!.crianca_idade}
                placeholder="Digite aqui a idade da criança" 
                {...register("crianca_idade")} 
                error={errors.crianca_idade as { message: string } | undefined}/>
            <Input 
                title="responsável" 
                type="text" 
                defaultValue={currentAgendamento!.responsavel_nome}
                placeholder="Digite aqui o responsável da criança" 
                {...register("responsavel_nome")} 
                error={errors.responsavel_nome as { message: string } | undefined}/>
            <Input 
                title="observação" 
                type="text" 
                defaultValue={currentAgendamento!.observacao}
                placeholder="Alguma observação?" 
                {...register("observacao")} 
                error={errors.observacao as { message: string } | undefined}/>


              <Input 
                id="telefone"
                title="Contato" 
                type="text" 
                defaultValue={currentAgendamento!.telefone}
                // onKeyUp={
                //   handlePhone
                // } 
                minLength={10}
                maxLength={12}
                placeholder="Digite aqui o contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>

              <StyledButton type="submit">Editar agendamento</StyledButton>
          </Form>
      </Modal>
  )
}