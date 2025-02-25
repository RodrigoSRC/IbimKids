import { Dispatch, SetStateAction } from "react";

export interface ModalEditTaskProps {
    isOpenEditAgendamento: boolean;
    setIsOpenEditAgendamento: Dispatch<SetStateAction<boolean>>;
    agendamentoId: string;
  }