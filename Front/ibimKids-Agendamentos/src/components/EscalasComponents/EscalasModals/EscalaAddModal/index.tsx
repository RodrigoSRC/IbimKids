import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEscalaSchema, escalaSchema } from "./schema";
import { Modal } from "../Modal";
import { Form } from "./style";
import { EscalasListContext } from "../../../../providers/EscalasListContext";
import { Input } from "../../../RegisterForm/Input";
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography";
import { api }from "../../../../services/api"; // Ajuste o caminho conforme sua estrutura
import {
  TagPicker
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';



interface ModalAddTaskProps {
  toggleModalEscala: () => void;
  setIsOpenAddEscala: Dispatch<SetStateAction<boolean>>;
}

interface Professor {
  id: string;
  nome: string;
  telefone: string;
  data_registrada: string;
}

export const AddEscalaModal = ({ toggleModalEscala, setIsOpenAddEscala }: ModalAddTaskProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TEscalaSchema>({
    resolver: zodResolver(escalaSchema), mode: "onChange"
  });

  const { addEscala } = useContext(EscalasListContext);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [professorIds, setProfessorIds] = useState<string[]>([]);
  const [isTagPickerOpen, setIsTagPickerOpen] = useState(false); // Estado para saber se o TagPicker está aberto

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const { data } = await api.get("/professores");
        setProfessores(data);

      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };

    fetchProfessores();
  }, []);

  const createEscala = async (data: TEscalaSchema) => {
    const formData = {
      ...data,
      // professorIds, // Incluindo os IDs dos professores selecionados
    };
    
    addEscala(formData);
    setIsOpenAddEscala(false);
  };


  return (
    <Modal toggleModal={toggleModalEscala} blockClosing={isTagPickerOpen}>
      <Form onSubmit={handleSubmit(createEscala)}>
        <StyledTitle>Adicione uma nova Escala</StyledTitle>

        <TagPicker
            size="lg"
            
            block
            data={professores.map(prof => ({ label: prof.nome, value: prof.id }
            )
          )
         
        } // Ajuste do formato
            value={professorIds}
            onChange={(values) => {
              console.log("true")
              setProfessorIds(values); 
              // Atualiza o estado local
              setValue("professorIds", values); 
              setIsOpenAddEscala(true);
              // Atualiza no formulário
            }}
            onOpen={() => setIsTagPickerOpen(true)}  // Quando abrir, bloqueia fechamento
            onClose={() => setIsTagPickerOpen(false)} // Quando fechar, libera fechamento
            placeholder="Professores"
            
          />

        <Input 
          title="Nome" 
          type="text" 
          placeholder="Digite aqui o nome da escala" 
          {...register("nome")} 
          error={errors.nome as { message: string } | undefined}
        />

        <Input 
          title="Faixa Etária" 
          type="text" 
          placeholder="Digite aqui a faixa etária" 
          {...register("faixa_etaria")} 
          error={errors.faixa_etaria as { message: string } | undefined}
        />

        <Input 
          title="Limite" 
          type="text" 
          placeholder="Digite aqui o limite" 
          {...register("limite")} 
          error={errors.limite as { message: string } | undefined}
        />

        <Input 
          title="Data" 
          type="date" 
          min={new Date().toISOString().split("T")[0]} 
          placeholder="Digite aqui a data da escala" 
          {...register("data_escala")} 
          error={errors.data_escala as { message: string } | undefined}
        />

        <Input 
          title="Turno"
          as="select"
          {...register("data_turno")}
          error={errors.data_turno as { message: string } | undefined}
        >
          <option value="">Selecione o turno</option>
          <option value="MANHA">Manhã</option>
          <option value="TARDE">Tarde</option>
          <option value="NOITE">Noite</option>
        </Input>

        <Input 
          title="Descrição" 
          type="text" 
          placeholder="Alguma observação?" 
          {...register("descricao")} 
          error={errors.descricao as { message: string } | undefined}
        />

        <StyledButton type="submit">Registrar escala</StyledButton>
      </Form>
    </Modal>
  );
};