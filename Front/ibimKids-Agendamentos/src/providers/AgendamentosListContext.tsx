import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { Agendamento } from "../pages/Home/interface";
import { toast } from "react-toastify"

interface FormData {
    crianca_nome: string;
    // crianca_idade: string;
    responsavel_nome: string;
    telefone: string;
    observacao: string;
    escalaId: string;
  }

interface AgendamentosValues {
  agendamentos: Agendamento[];
  setAgendamentos: React.Dispatch<React.SetStateAction<Agendamento[]>>;
  addAgendamento: (formData: any) => Promise<void>;
  editAgendamento: (formData: any, agendamentoId: string) => Promise<void>;
  deleteAgendamento: (agendamentoId: string) => Promise<void>;
  isOpenEditAgendamento: boolean;
  setIsOpenEditAgendamento: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemoveAgendamento: boolean; 
  setIsOpenRemoveAgendamento: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AgendamentoProviderProps {
  children: React.ReactNode
}

export const AgendamentosListContext = createContext<AgendamentosValues>({} as AgendamentosValues);

export const AgendamentosListProvider = ({ children }:AgendamentoProviderProps) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const [isOpenEditAgendamento, setIsOpenEditAgendamento] = useState(false);
  const [isOpenRemoveAgendamento, setIsOpenRemoveAgendamento] = useState(false);
 
  useEffect(() => {
    const getAgendamentosToList = async () => {

      try {
        const { data } = await api.get("/agendamentos");
        
        setAgendamentos(data);

      } catch (error) {
        console.log(error);
      }
    };
    getAgendamentosToList();

  }, []);

  const addAgendamento = async (formData: FormData) => {
    try {

      const newAgendamento = {
        ...formData,
      };

      const { data } = await api.post("/agendamentos", newAgendamento
    );
    
    setAgendamentos((agendamentos) => [...agendamentos, data]);

    toast.success("Agendamento criado com sucesso", {
      theme: "dark",
      autoClose: 1500,
    });
      
    } catch (error: any) {
          console.error(error);
    
          const errorMessage =
          error.response?.data?.message ||
          "Erro ao adicionar agendamento. Tente novamente.";
    
        toast.error(errorMessage, {
          theme: "dark",
          autoClose: 2000,
        });
        }
      };

  const deleteAgendamento = async (agendamentoId: string) => {
    try {
      
      await api.delete(`/agendamentos/${agendamentoId}`
      );
      
      setAgendamentos((agendamentoList) => agendamentoList.filter((agendamento) => agendamento.id !== agendamentoId));
      
      toast.success("Agendamento deletado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

    } catch (error: any) {
          console.error(error);
    
          const errorMessage =
          error.response?.data?.message ||
          "Erro ao deletar agendamento. Tente novamente.";
    
        toast.error(errorMessage, {
          theme: "dark",
          autoClose: 2000,
        });
        }
      };

  const editAgendamento = async (formData: FormData, agendamentoId: string) => {
    try {

      const newAgendamento = {
        id: agendamentoId,
        ...formData,
      };

      toast.success("Agendamento editado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.patch(`/agendamentos/${agendamentoId}`
        , newAgendamento
    // , {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    );

      setAgendamentos((agendamentos) =>
        agendamentos.map((agendamento) => agendamento.id === agendamentoId ? { ...agendamento, ...data } : agendamento
        )
      );
    } catch (error: any) {
          console.error(error);
    
          const errorMessage =
          error.response?.data?.message ||
          "Erro ao editar agendamento. Tente novamente.";
    
        toast.error(errorMessage, {
          theme: "dark",
          autoClose: 2000,
        });
        }
      };
  

  return (
    <AgendamentosListContext.Provider
      value={{
        agendamentos,
        setAgendamentos,
        addAgendamento,
        editAgendamento,
        deleteAgendamento,
        isOpenEditAgendamento,
        isOpenRemoveAgendamento,
        setIsOpenEditAgendamento,
        setIsOpenRemoveAgendamento,
      }}
    >
      {children}
    </AgendamentosListContext.Provider>
  );
};
