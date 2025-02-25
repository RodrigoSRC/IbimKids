import { useContext } from "react"
import { AgendamentosListContext } from "../../../../providers/AgendamentosListContext"
import {
  Button, Form, Modal
} from 'rsuite';
import { ModalEditTaskProps } from "./interface";


export const RemoveAgendamentoModal = ({ isOpenRemoveAgendamento, setIsOpenRemoveAgendamento, agendamentoId  }: ModalEditTaskProps) => {
  const { deleteAgendamento } = useContext(AgendamentosListContext)


  const onSubmit = async () => {
    try {
      await deleteAgendamento(agendamentoId);
      setIsOpenRemoveAgendamento(false);
    } catch (error) {
      console.error("Erro ao remover o agendamento:", error);
    }
  };


  return (
    <Modal
      open={isOpenRemoveAgendamento}
      onClose={() => setIsOpenRemoveAgendamento(false)}
    >
      <Modal.Header>
        <Modal.Title>Deseja mesmo excluir esse <strong>Agendamento</strong>?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Button appearance="primary" onClick={() => onSubmit()}>
            Sim
          </Button>
          <Button
            appearance="link"
            onClick={() => setIsOpenRemoveAgendamento(false)}
          >
            Não
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};