import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { Escala } from "../pages/HomePage";
import { toast } from "react-toastify"
import { UserContext } from "./UserContext";

interface FormData {
  nome: string;
  descricao: string;
  faixa_etaria: string;
  limite: string;
  data_escala: string;
  data_turno: string;
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

      toast.success("Contato criado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.post("/escalas", newEscala, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEscalas((escalas) => [...escalas, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEscala = async (escalaId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      toast.success("Contato deletado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      await api.delete(`/escalas/${escalaId}`
      , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setEscalas((escalaList) => escalaList.filter((escala) => escala.id !== escalaId));

    } catch (error) {
      console.log(error);
    }
  };

  const editEscala = async (formData: FormData, escalaId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newEscala = {
        id: escalaId,
        ...formData,
      };

      toast.success("Escala editada com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.patch(`/escalas/${escalaId}`, newEscala, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEscalas((escalas) =>
        escalas.map((escala) => escala.id === escalaId ? { ...escala, ...data } : escala
        )
      );
    } catch (error) {
      console.log(error);
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
