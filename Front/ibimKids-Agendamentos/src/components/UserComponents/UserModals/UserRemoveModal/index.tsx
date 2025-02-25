import { useContext } from "react"
import { UserContext } from "../../../../providers/UserContext"
import { ModalEditTaskProps } from "./interface";
import { Form, Modal, Button } from "rsuite";


export const RemoveUserModal = ({ isOpenRemoveUser, setIsOpenRemoveUser, clientId  }: ModalEditTaskProps) => {
  const { deleteUser } = useContext(UserContext)


  const onSubmit = async () => {
    try {
      await deleteUser(clientId);
      setIsOpenRemoveUser(false);
    } catch (error) {
      console.error("Erro ao remover o usuário:", error);
    }
  };


  return (
      <Modal open={isOpenRemoveUser} onClose={() => setIsOpenRemoveUser(false)}>
        <Modal.Header>
          <Modal.Title>Deseja mesmo excluir esse <strong>Usuário</strong>?</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <Form>
          <Button appearance="primary" onClick={() => onSubmit()}>
            Sim
          </Button>
          <Button
            appearance="link"
            onClick={() => setIsOpenRemoveUser(false)}
          >
            Não
          </Button>
        </Form>
      </Modal.Body>


      </Modal>
  )
}