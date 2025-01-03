import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TProfessorSchema, professorSchema } from "./schema"
import { Modal } from "../Modal"
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext"
import { Form } from "./style"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"
import { handlePhone } from "./schema"


interface ModalEditTaskProps {
    toggleModalProf: () => void;
    setIsOpenEditProf: Dispatch<SetStateAction<boolean>>;
    professorId: string;
  }


export const EditProfessorModal = ({ toggleModalProf, setIsOpenEditProf, professorId  }: ModalEditTaskProps) => {
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
      <Modal toggleModal={toggleModalProf}>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <StyledTitle>Edite o professor</StyledTitle>
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
                onKeyUp={
                  handlePhone
                } 
                minLength={10}
                maxLength={12}
                placeholder="Digite aqui o contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>

              <StyledButton type="submit">Editar contato</StyledButton>
          </Form>
      </Modal>
  )
}