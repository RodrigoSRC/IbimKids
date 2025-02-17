import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { Escala } from "../pages/HomePage";
import { toast } from "react-toastify"

interface FormData {
  nome: string;
  descricao: string;
  faixa_etaria: string;
  limite: string;
  data_escala: string;
  data_turno: string;
  // professorIds: string;
  // professores: [];
}


interface EscalasValues {
  escalas: Escala[];
  setEscalas: React.Dispatch<React.SetStateAction<Escala[]>>;
  addEscala: (formData: any) => Promise<void>;
  editEscala: (formData: any, escalaId: string) => Promise<void>;
  deleteEscala: (escalaId: string) => Promise<void>;
  isOpenAddEscala: boolean;
  setIsOpenAddEscala: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenEditEscala: boolean;
  setIsOpenEditEscala: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemoveEscala: boolean; 
  setIsOpenRemoveEscala: React.Dispatch<React.SetStateAction<boolean>>;
}


interface EscalaProviderProps {
  children: React.ReactNode
}


export const EscalasListContext = createContext<EscalasValues>({} as EscalasValues);

export const EscalasListProvider = ({ children }:EscalaProviderProps) => {
  const [escalas, setEscalas] = useState<Escala[]>([]);

  const [isOpenAddEscala, setIsOpenAddEscala] = useState(false);
  const [isOpenEditEscala, setIsOpenEditEscala] = useState(false);
  const [isOpenRemoveEscala, setIsOpenRemoveEscala] = useState(false);

 


  useEffect(() => {
    const getEscalasToList = async () => {

      try {
        const { data } = await api.get("/escalas");
        
        setEscalas(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEscalasToList();

  }, []);

  const addEscala = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newEscala = {
        ...formData,
      };
      console.log(newEscala)

      const { data } = await api.post("/escalas", newEscala, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEscalas((escalas) => [...escalas, data]);

      toast.success("Escala criada com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

    } catch (error: any) {
      console.error(error);

      const errorMessage =
      error.response?.data?.message ||
      "Erro ao criar escala. Tente novamente.";

    toast.error(errorMessage, {
      theme: "dark",
      autoClose: 2000,
    });
    }
  };

  const deleteEscala = async (escalaId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      await api.delete(`/escalas/${escalaId}`
      , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setEscalas((escalaList) => escalaList.filter((escala) => escala.id !== escalaId));

      toast.success("Escala deletada com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

    } catch (error: any) {
      console.error(error);

      const errorMessage =
      error.response?.data?.message ||
      "Erro ao deletar escala. Tente novamente.";

    toast.error(errorMessage, {
      theme: "dark",
      autoClose: 2000,
    });
    }
  };

  const editEscala = async (formData: FormData, escalaId: string) => {
    try {

      const token = localStorage.getItem("@TOKEN");

      const newEscala = {
        id: escalaId,
        ...formData,
      };


      const { data } = await api.patch(`/escalas/${escalaId}`, newEscala, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEscalas((escalas) =>
        escalas.map((escala) => escala.id === escalaId ? { ...escala, ...data } : escala
        )
      );

      toast.success("Escala editada com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });
      
    } catch (error: any) {
      console.error(error);

      const errorMessage =
      error.response?.data?.message ||
      "Erro ao editar escala. Tente novamente.";

    toast.error(errorMessage, {
      theme: "dark",
      autoClose: 2000,
    });
    }
  };
  

  return (
    <EscalasListContext.Provider
      value={{
        escalas,
        setEscalas,
        addEscala,
        editEscala,
        deleteEscala,
        isOpenAddEscala,
        setIsOpenAddEscala,
        isOpenEditEscala,
        setIsOpenEditEscala,
        isOpenRemoveEscala, 
        setIsOpenRemoveEscala,
      }}
    >
      {children}
    </EscalasListContext.Provider>
  );
};
