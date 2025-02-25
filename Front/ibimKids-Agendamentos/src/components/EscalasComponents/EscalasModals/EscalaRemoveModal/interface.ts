import { Dispatch, SetStateAction } from "react"

export interface ModalEditTaskProps {
    isOpenRemoveEscala: boolean;
    setIsOpenRemoveEscala: Dispatch<SetStateAction<boolean>>;
    escalaId: string;
  }