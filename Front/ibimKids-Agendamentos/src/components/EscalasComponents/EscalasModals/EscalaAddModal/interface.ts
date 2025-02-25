import { Dispatch, SetStateAction } from "react";

export interface ModalAddTaskProps {
    isOpenAddEscala: boolean; // Booleano, e não uma função
    setIsOpenAddEscala: Dispatch<SetStateAction<boolean>>;
}

  
export  interface Professor {
    id: string;
    nome: string;
    telefone: string;
    data_registrada: string;
  }