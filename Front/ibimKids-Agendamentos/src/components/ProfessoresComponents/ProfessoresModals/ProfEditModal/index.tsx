import { useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TProfessorSchema, professorSchema } from "./schema"
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext"
import { ModalEditTaskProps } from "./interface"
import {
  Input, Button, Form, Modal
} from 'rsuite';



export const EditProfessorModal = ({ isOpenEditProf, setIsOpenEditProf, professorId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TProfessorSchema>({
    resolver: zodResolver(professorSchema)
})
  const { editProfessor, professores } = useContext(ProfessoresListContext)

  const currentProfessor = professores.find(professor => professor.id === professorId)


  const onSubmit = async (data: TProfessorSchema, e: any) => {
    e.preventDefault()
    try {
      await editProfessor(data, professorId);
      setIsOpenEditProf(false);
    } catch (error) {
      console.error("Erro ao editar o professor", error);
    }
  };


  return (
      <Modal open={isOpenEditProf} onClose={() => setIsOpenEditProf(false)}>
          <Modal.Header>
            <Modal.Title>Edite o Professor</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form
                onSubmit={(_, event) => {
                  event?.preventDefault();
                  handleSubmit(onSubmit)();
                }}
              >

              <Input 
                  title="nome" 
                  type="text" 
                  defaultValue={currentProfessor!.nome}
                  placeholder="Digite aqui o nome do professor" 
                  {...register("nome")} 
                  error={errors.nome as { message: string } | undefined}/>


                <Input 
                  id="telefone"
                  title="Contato" 
                  type="text" 
                  defaultValue={currentProfessor!.telefone}
                  // onKeyUp={
                  //   handlePhone
                  // } 
                  minLength={10}
                  maxLength={12}
                  placeholder="Digite aqui o contato" 
                  {...register("telefone")} 
                  error={errors.telefone as { message: string } | undefined}/>

                <Button appearance="primary" type="submit">Editar contato</Button>
            </Form>
          </Modal.Body>
      </Modal>
  )
}