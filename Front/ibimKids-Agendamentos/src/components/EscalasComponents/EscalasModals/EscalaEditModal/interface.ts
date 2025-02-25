import { Dispatch, SetStateAction } from "react"

export interface ModalEditTaskProps {
    isOpenEditEscala: boolean;
    setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
    escalaId: string;
  }

export  interface Professor {
    id: string;
    nome: string;
    telefone: string;
    data_registrada: string;
  }