import { Dispatch, SetStateAction, useContext, useEffect } from "react"

export interface ModalAddTaskProps {
    isOpenAddProf: boolean
    setIsOpenAddProf: Dispatch<SetStateAction<boolean>>
  }