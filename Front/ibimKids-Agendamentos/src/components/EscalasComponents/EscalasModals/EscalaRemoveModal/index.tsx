import { useContext } from "react";
import { EscalasListContext } from "../../../../providers/EscalasListContext";
import { ModalEditTaskProps } from "./interface";
import { Button, Form, Modal } from "rsuite";

export const RemoveEscalaModal = ({
  isOpenRemoveEscala,
  setIsOpenRemoveEscala,
  escalaId,
}: ModalEditTaskProps) => {
  const { deleteEscala } = useContext(EscalasListContext);

  const onSubmit = async () => {
    try {
      await deleteEscala(escalaId);
      setIsOpenRemoveEscala(false);
    } catch (error) {
      console.error("Erro ao remover a escala:", error);
    }
  };

  return (
    <Modal
      open={isOpenRemoveEscala}
      onClose={() => setIsOpenRemoveEscala(false)}
    >
      <Modal.Header>
        <Modal.Title>Deseja mesmo excluir essa Escala?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Button appearance="primary" onClick={() => onSubmit()}>
            Sim
          </Button>
          <Button
            appearance="link"
            onClick={() => setIsOpenRemoveEscala(false)}
          >
            Não
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
