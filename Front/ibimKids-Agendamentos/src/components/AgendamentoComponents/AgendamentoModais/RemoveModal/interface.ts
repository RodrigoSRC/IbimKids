import { Dispatch, SetStateAction } from "react";

export interface ModalEditTaskProps {
    isOpenRemoveAgendamento: boolean;
    setIsOpenRemoveAgendamento: Dispatch<SetStateAction<boolean>>;
    agendamentoId: string;
  }