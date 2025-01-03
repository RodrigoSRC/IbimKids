import { Dispatch, SetStateAction, useContext } from "react"
import { Modal } from "../Modal"
import { EscalasListContext } from "../../../../providers/EscalasListContext"
import { StyledTitle } from "../../../../styles/typography"
import { Div } from "./style";

interface ModalEditTaskProps {
    toggleModalEscala: () => void;
    setIsOpenRemoveEscala: Dispatch<SetStateAction<boolean>>;
    escalaId: string;
  }


export const RemoveEscalaModal = ({ toggleModalEscala, setIsOpenRemoveEscala, escalaId  }: ModalEditTaskProps) => {
  const { deleteEscala } = useContext(EscalasListContext)


  const onSubmit = async () => {
    try {
      await deleteEscala(escalaId);
      setIsOpenRemoveEscala(false);
    } catch (error) {
      console.error("Erro ao remover a escala:", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalEscala}>
        <Div>

          <StyledTitle>Deseja mesmo excluir essa escala?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemoveEscala(false)}>Não</button>
        </Div>


      </Modal>
  )
}