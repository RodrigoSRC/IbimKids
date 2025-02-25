import { useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TProfessorSchema, professorSchema } from "./schema"
import { Modal, Input, Form, Button } from "rsuite";
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext"
import { ModalAddTaskProps } from "./interface"; 
import "rsuite/dist/rsuite.min.css";


export const AddProfessorModal = ({ isOpenAddProf, setIsOpenAddProf }: ModalAddTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TProfessorSchema>({
      resolver: zodResolver(professorSchema), mode: "onChange"
  })
  const { addProfessor } = useContext(ProfessoresListContext)

  const createProfessor = async (data: TProfessorSchema) => {
    addProfessor(data)
    setIsOpenAddProf(false)
  }


  return (
      <Modal open={isOpenAddProf} onClose={() => setIsOpenAddProf(false)}>
              <Modal.Header>
                <Modal.Title>Adicionar Novo Professor</Modal.Title>
              </Modal.Header>
              <Form
                onSubmit={(_, event) => {
                  event?.preventDefault();
                  handleSubmit(createProfessor)();
                }}
              >
              <Input 
                title="nome" 
                type="text" 
                placeholder="Digite aqui o nome do professor" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}
                />


              <Input 
                id="telefone"
                title="Contato" 
                type="text" 
                minLength={10}
                maxLength={12}
                placeholder="Digite aqui o contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}
                />



              <Button appearance="primary" type="submit">Registrar professor</Button>
          </Form>
      </Modal>
  )
}