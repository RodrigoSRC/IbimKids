import { Dispatch, SetStateAction, useContext } from "react"
import { Modal } from "../Modal"
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext"
import { StyledTitle } from "../../../../styles/typography"
import { Div } from "./style";

interface ModalEditTaskProps {
    toggleModalProf: () => void;
    setIsOpenRemoveProf: Dispatch<SetStateAction<boolean>>;
    professorId: string;
  }


export const RemoveProfessorModal = ({ toggleModalProf, setIsOpenRemoveProf, professorId  }: ModalEditTaskProps) => {
  const { deleteProfessor } = useContext(ProfessoresListContext)


  const onSubmit = async () => {
    try {
      await deleteProfessor(professorId);
      setIsOpenRemoveProf(false);
    } catch (error) {
      console.error("Erro ao remover a escala:", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalProf}>
        <Div>

          <StyledTitle>Deseja mesmo excluir essa escala?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemoveProf(false)}>Não</button>
        </Div>


      </Modal>
  )
}