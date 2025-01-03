import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { Professor } from "../pages/HomePage";
import { toast } from "react-toastify"

interface FormData {
  nome: string;
  telefone: string;
}


interface ProfessoresValues {
  professores: Professor[];
  setProfessores: React.Dispatch<React.SetStateAction<Professor[]>>;
  addProfessor: (formData: any) => Promise<void>;
  editProfessor: (formData: any, professorId: string) => Promise<void>;
  deleteProfessor: (professorId: string) => Promise<void>;
  isOpenAddProf: boolean;
  setIsOpenAddProf: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenEditProf: boolean;
  setIsOpenEditProf: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemoveProf: boolean; 
  setIsOpenRemoveProf: React.Dispatch<React.SetStateAction<boolean>>;
}


interface ProfessorProviderProps {
  children: React.ReactNode
}


export const ProfessoresListContext = createContext<ProfessoresValues>({} as ProfessoresValues);

export const ProfessoresListProvider = ({ children }:ProfessorProviderProps) => {
  const [professores, setProfessores] = useState<Professor[]>([]);

  const [isOpenAddProf, setIsOpenAddProf] = useState(false);
  const [isOpenEditProf, setIsOpenEditProf] = useState(false);
  const [isOpenRemoveProf, setIsOpenRemoveProf] = useState(false);

 


  useEffect(() => {
    const getProfessoresToList = async () => {
      try {
        const { data } = await api.get("/professores");
        setProfessores(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfessoresToList();

  }, []);

  const addProfessor = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newProfessor = {
        ...formData,
      };

      toast.success("Professor criado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.post("/professores", newProfessor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfessores((professores) => [...professores, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfessor = async (professorId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      toast.success("Contato deletado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      await api.delete(`/professores/${professorId}`
      , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setProfessores((professorList) => professorList.filter((professor) => professor.id !== professorId));

    } catch (error) {
      console.log(error);
    }
  };

  const editProfessor = async (formData: FormData, professorId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newProfessor = {
        id: professorId,
        ...formData,
      };

      toast.success("Professor editado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.patch(`/professores/${professorId}`, newProfessor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfessores((professores) =>
        professores.map((professor) => professor.id === professorId ? { ...professor, ...data } : professor
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <ProfessoresListContext.Provider
      value={{
        professores,
        setProfessores,
        addProfessor,
        editProfessor,
        deleteProfessor,
        isOpenAddProf,
        setIsOpenAddProf,
        isOpenEditProf,
        setIsOpenEditProf,
        isOpenRemoveProf, 
        setIsOpenRemoveProf,
      }}
    >
      {children}
    </ProfessoresListContext.Provider>
  );
};
