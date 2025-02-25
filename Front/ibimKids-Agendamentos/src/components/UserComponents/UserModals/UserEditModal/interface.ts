import { Dispatch, SetStateAction } from "react";

export interface ModalEditTaskProps {
    isOpenEditUser: boolean;
      setIsOpenEditUser: Dispatch<SetStateAction<boolean>>;
      clientId: string;
    }