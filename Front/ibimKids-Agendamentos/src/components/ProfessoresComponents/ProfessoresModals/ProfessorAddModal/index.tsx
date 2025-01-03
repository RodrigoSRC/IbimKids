import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TProfessorSchema, professorSchema } from "./schema"
import { Modal } from "../Modal"
import { Form } from "./style"
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button"
import { StyledTitle } from "../../../../styles/typography"
// import 'jquery-mask-plugin';
import { handlePhone } from "./schema"


interface ModalAddTaskProps {
  toggleModalProf: () => void
  setIsOpenAddProf: Dispatch<SetStateAction<boolean>>
}


export const AddProfessorModal = ({ toggleModalProf, setIsOpenAddProf }: ModalAddTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TProfessorSchema>({
      resolver: zodResolver(professorSchema), mode: "onChange"
  })
  const { addProfessor } = useContext(ProfessoresListContext)

  const createProfessor = async (data: TProfessorSchema) => {
    addProfessor(data)
    setIsOpenAddProf(false)
  }


  return (
      <Modal toggleModal={toggleModalProf}>

          <Form onSubmit={handleSubmit(createProfessor)}>
              <StyledTitle>Adicione um novo Professor</StyledTitle>
              <Input 
                title="nome" 
                type="text" 
                placeholder="Digite aqui o nome do professor" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}/>


              <Input 
                id="telefone"
                title="Contato" 
                type="text" 
                onKeyUp={
                  handlePhone
                } 
                minLength={10}
                maxLength={12}
                placeholder="Digite aqui o contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>



              <StyledButton type="submit">Registrar escala</StyledButton>
          </Form>
      </Modal>
  )
}