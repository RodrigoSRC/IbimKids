import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TUserSchema, userSchema } from "./schema"
import { UserContext } from "../../../../providers/UserContext"
import { Button, InputGroup, Input, Form, Modal } from "rsuite"
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
import { ModalEditTaskProps } from "./interface"


export const UserEditModal = ({ isOpenEditUser, setIsOpenEditUser, clientId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, setValue, formState: {errors}   } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema)
})
  const { editUser, user } = useContext(UserContext)
  const [visible, setVisible] = useState(false);
  const [senha, setSenha] = useState("");

  const handleChange = () => {
    setVisible(!visible);
  };
  


  const onSubmit = async (data: TUserSchema, e: any) => {
    e.preventDefault()
    try {
      await editUser(data, clientId);
      setIsOpenEditUser(false);
    } catch (error) {
      console.error("Erro ao editar o usuário", error);
    }
  };


  return (
      <Modal open={isOpenEditUser} onClose={() => setIsOpenEditUser(false)}>
              <Modal.Header>
                <Modal.Title>Edite o Usuário</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form
                      onSubmit={(_, event) => {
                        event?.preventDefault();
                        handleSubmit(onSubmit)();
                      }}
                    >

                {/* <StyledTitle>Edite seu usuário</StyledTitle> */}
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
                      // onKeyUp={
                      //   handlePhone
                      // } 
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

          <InputGroup inside>
                  <Input
                    type={visible ? "text" : "password"}
                    value={senha}
                    onChange={(value) => {
                      setSenha(value);
                      setValue("senha", value); // Atualiza o react-hook-form manualmente
                    }}
                    placeholder="Digite aqui sua senha"
                  />
                  <InputGroup.Button onClick={handleChange}>
                    {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                  </InputGroup.Button>
                </InputGroup>
                <Button appearance="primary" type="submit">Editar usuário</Button>
                </Form>

              </Modal.Body>


      </Modal>
  )
}