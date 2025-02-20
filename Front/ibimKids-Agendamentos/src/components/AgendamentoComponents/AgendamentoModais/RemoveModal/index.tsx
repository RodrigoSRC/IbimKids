import { Dispatch, SetStateAction, useContext } from "react"
import { Modal } from "../../../EscalasComponents/EscalasModals/Modal"
import { AgendamentosListContext } from "../../../../providers/AgendamentosListContext"
import { StyledTitle } from "../../../../styles/typography"
import { Div } from "./style";

interface ModalEditTaskProps {
    toggleModalAgendamento: () => void;
    setIsOpenRemoveAgendamento: Dispatch<SetStateAction<boolean>>;
    agendamentoId: string;
  }


export const RemoveAgendamentoModal = ({ toggleModalAgendamento, setIsOpenRemoveAgendamento, agendamentoId  }: ModalEditTaskProps) => {
  const { deleteAgendamento } = useContext(AgendamentosListContext)
  console.log(agendamentoId)


  const onSubmit = async () => {
    try {
      await deleteAgendamento(agendamentoId);
      setIsOpenRemoveAgendamento(false);
    } catch (error) {
      console.error("Erro ao remover o agendamento:", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalAgendamento}>
        <Div>

          <StyledTitle>Deseja mesmo excluir esse Agendamento?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemoveAgendamento(false)}>Não</button>
        </Div>


      </Modal>
  )
}