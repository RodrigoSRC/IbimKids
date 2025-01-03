import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TEscalaSchema, escalaSchema } from "./schema"
import { Modal } from "../Modal"
import { EscalasListContext } from "../../../../providers/EscalasListContext"
import { Form } from "./style"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"


interface ModalEditTaskProps {
  toggleModalEscala: () => void;
    setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
    escalaId: string;
  }


export const EditEscalaModal = ({ toggleModalEscala, setIsOpenEdit, escalaId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TEscalaSchema>({
    resolver: zodResolver(escalaSchema)
})
  const { editEscala, escalas } = useContext(EscalasListContext)

  const currentEscala = escalas.find(escala => escala.id === escalaId)


  const onSubmit = async (data: TEscalaSchema, e: any) => {
    e.preventDefault()
    try {
      await editEscala(data, escalaId);
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Erro ao editar a escala", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalEscala}>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <StyledTitle>Edite o contato</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                defaultValue={currentEscala!.nome}
                placeholder="Digite aqui o nome" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}/>

              <Input 
                title="Faixa Etária" 
                type="text" 
                // onKeyUp={
                //   handlePhone
                // } 
                defaultValue={currentEscala!.faixa_etaria}
                placeholder="Digite aqui a faixa etária" 
                {...register("faixa_etaria")} 
                error={errors.faixa_etaria as { message: string } | undefined}/>

              <Input 
                title="Data da Escala" 
                type="data_escala" 
                defaultValue={currentEscala!.data_escala}
                placeholder="Digite aqui a data da escala" 
                {...register("data_escala")} 
                error={errors.data_escala as { message: string } | undefined}/>   

              <Input 
                title="Turno da escala" 
                type="data_turno" 
                defaultValue={currentEscala!.data_turno}
                placeholder="Digite aqui o turno da escala" 
                {...register("data_turno")} 
                error={errors.data_turno as { message: string } | undefined}/>   

              <StyledButton type="submit">Editar contato</StyledButton>
          </Form>
      </Modal>
  )
}