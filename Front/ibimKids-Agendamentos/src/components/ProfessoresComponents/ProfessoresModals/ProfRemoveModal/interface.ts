import { Dispatch, SetStateAction } from "react"

export interface ModalRemoveTaskProps {
    isOpenRemoveProf: boolean;
    setIsOpenRemoveProf: Dispatch<SetStateAction<boolean>>;
    professorId: string;
  }