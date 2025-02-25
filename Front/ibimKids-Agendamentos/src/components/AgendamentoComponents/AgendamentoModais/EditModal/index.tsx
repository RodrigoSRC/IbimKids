import { useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TAgendamentoSchema, agendamentoSchema } from "./schema"
import { AgendamentosListContext } from "../../../../providers/AgendamentosListContext"
import { Button, Input, Form, Modal } from "rsuite"
import { ModalEditTaskProps } from "./interface"


export const EditAgendamentoModal = ({ isOpenEditAgendamento, setIsOpenEditAgendamento, agendamentoId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TAgendamentoSchema>({
    resolver: zodResolver(agendamentoSchema)
})
  const { editAgendamento, agendamentos } = useContext(AgendamentosListContext)

  const currentAgendamento = agendamentos.find(agendamento => agendamento.id === agendamentoId)


  const onSubmit = async (data: TAgendamentoSchema, e: any) => {
    console.log("submit")
    e.preventDefault()
    try {
      
      await editAgendamento(data, agendamentoId);
      setIsOpenEditAgendamento(false);
    } catch (error) {
      console.error("Erro ao editar o agendamento", error);
    }
  };


  return (
    <Modal open={isOpenEditAgendamento} onClose={() => setIsOpenEditAgendamento(false)}>
    <Modal.Header>
      <Modal.Title>Edite o <strong>Agendamento</strong></Modal.Title>
    </Modal.Header>

      <Modal.Body>
        <Form
            onSubmit={(_, event) => {
              event?.preventDefault();
              handleSubmit(onSubmit)();
            }}
          >

              
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
                  minLength={10}
                  maxLength={12}
                  placeholder="Digite aqui o contato" 
                  {...register("telefone")} 
                  error={errors.telefone as { message: string } | undefined}/>

                <Button appearance="primary" type="submit">Editar agendamento</Button>
            </Form>
          </Modal.Body>
      </Modal>
  )
}