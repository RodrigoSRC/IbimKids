import { Dispatch, SetStateAction } from "react";

export interface ModalEditTaskProps {
    isOpenEditProf: boolean;
    setIsOpenEditProf: Dispatch<SetStateAction<boolean>>;
    professorId: string;
  }