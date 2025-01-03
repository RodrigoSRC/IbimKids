import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TUserSchema, userSchema, handlePhone } from "./schema"
import { Modal } from "../Modal"
import { UserContext } from "../../../../providers/UserContext"
import { Form } from "./styles"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"


interface ModalEditTaskProps {
  toggleModalUser: () => void;
    setIsOpenEditUser: Dispatch<SetStateAction<boolean>>;
    clientId: string;
  }


export const UserEditModal = ({ toggleModalUser, setIsOpenEditUser, clientId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema)
})
  const { editUser, user } = useContext(UserContext)


  const onSubmit = async (data: TUserSchema) => {
    try {
      await editUser(data, clientId);
      setIsOpenEditUser(false);
    } catch (error) {
      console.error("Erro ao editar o usuário", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalUser}>

          <Form onSubmit={handleSubmit(onSubmit)}>

          <StyledTitle>Edite seu usuário</StyledTitle>
          <Input 
                title="Nome" 
                type="text" 
                defaultValue={user.nome}
                placeholder="Digite aqui o nome" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}/>

              <Input 
                title="Contato" 
                type="text" 
                defaultValue={user.telefone}
                onKeyUp={
                  handlePhone
                } 
                placeholder="Digite aqui o contato" 
                {...register("telefone")} 
                error={errors.telefone as { message: string } | undefined}/>

              <Input 
                title="Email" 
                type="email" 
                defaultValue={user.email}
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/> 

              <Input 
                title="Senha" 
                type="password" 
                placeholder="Digite aqui sua senha" 
                {...register("senha")} 
                error={errors.senha as { message: string } | undefined}/> 

              <StyledButton type="submit">Atualizar usuário</StyledButton>
          </Form>


      </Modal>
  )
}