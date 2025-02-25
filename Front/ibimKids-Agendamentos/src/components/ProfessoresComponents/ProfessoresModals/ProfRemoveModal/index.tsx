import { useContext } from "react";
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext";
import { ModalRemoveTaskProps } from "./interface";
import { Button, Form, Modal } from "rsuite";

export const RemoveProfessorModal = ({
  isOpenRemoveProf,
  setIsOpenRemoveProf,
  professorId,
}: ModalRemoveTaskProps) => {
  const { deleteProfessor } = useContext(ProfessoresListContext)

  const onSubmit = async () => {
    try {
      await deleteProfessor(professorId);
      setIsOpenRemoveProf(false);
    } catch (error) {
      console.error("Erro ao remover a Professor(a):", error);
    }
  };

  return (
    <Modal
      open={isOpenRemoveProf}
      onClose={() => setIsOpenRemoveProf(false)}
    >
      <Modal.Header>
        <Modal.Title>Deseja mesmo excluir esse <strong>Professor</strong>?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Button appearance="primary" onClick={() => onSubmit()}>
            Sim
          </Button>
          <Button
            appearance="link"
            onClick={() => setIsOpenRemoveProf(false)}
          >
            Não
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};