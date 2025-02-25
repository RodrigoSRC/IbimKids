import { Dispatch, SetStateAction } from "react";

export interface ModalEditTaskProps {
    isOpenRemoveUser: boolean;
      setIsOpenRemoveUser: Dispatch<SetStateAction<boolean>>;
      clientId: string;
    }
    