import { Dispatch, SetStateAction, useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TEscalaSchema, escalaSchema } from "./schema"
import { Modal } from "../Modal"
import { EscalasListContext } from "../../../../providers/EscalasListContext"
import { Form } from "./style"
import { Input } from "../../../RegisterForm/Input"
import { StyledButton } from "../../../Button/Button";
import { StyledTitle } from "../../../../styles/typography"
import { api }from "../../../../services/api";
import {
  TagPicker
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


interface ModalEditTaskProps {
    toggleModalEscala: () => void;
    setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
    escalaId: string;
  }

  interface Professor {
    id: string;
    nome: string;
    telefone: string;
    data_registrada: string;
  }

export const EditEscalaModal = ({ toggleModalEscala, setIsOpenEdit, escalaId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}, setValue   } = useForm<TEscalaSchema>({
    resolver: zodResolver(escalaSchema), mode: "onChange"
})
  const { editEscala, escalas } = useContext(EscalasListContext)
  const [professores, setProfessores] = useState<Professor[]>([]);
    const [professorIds, setProfessorIds] = useState<string[]>([]);
    const [isTagPickerOpen, setIsTagPickerOpen] = useState(false); 


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

  const currentEscala = escalas.find(escala => escala.id === escalaId)
  console.log(currentEscala)


  const onSubmit = async (data: TEscalaSchema, e: any) => {
    e.preventDefault()
    try {
      await editEscala(data, escalaId);
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Erro ao editar a escala", error);
    }
  };


  return (
      <Modal toggleModal={toggleModalEscala} blockClosing={isTagPickerOpen}>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <StyledTitle>Edite a escala</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                defaultValue={currentEscala!.nome}
                placeholder="Digite aqui o nome" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}/>

              <Input 
                title="Faixa Etária" 
                type="text" 
                // onKeyUp={
                //   handlePhone
                // } 
                defaultValue={currentEscala!.faixa_etaria}
                placeholder="Digite aqui a faixa etária" 
                {...register("faixa_etaria")} 
                error={errors.faixa_etaria as { message: string } | undefined}/>   


              <Input 
                id="limite"
                title="Limite" 
                type="text" 
                defaultValue={currentEscala!.limite}
                placeholder="Digite aqui o limite" 
                {...register("limite")} 
                error={errors.limite as { message: string } | undefined}/>


              <Input 
                title="Data" 
                type="date" 
                min={new Date().toISOString().split("T")[0]} 
                defaultValue={currentEscala!.data_escala}
                placeholder="Digite aqui a data da escala" 
                {...register("data_escala")} 
                error={errors.data_escala as { message: string } | undefined}/> 


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
                    setIsOpenEdit(true);
                    // Atualiza no formulário
                  }}
                  onOpen={() => setIsTagPickerOpen(true)}  // Quando abrir, bloqueia fechamento
                  onClose={() => setIsTagPickerOpen(false)} // Quando fechar, libera fechamento
                  placeholder="Professores"
                
              />


              <Input 
                title="Turno"
                as="select" // Mudando de input para select
                defaultValue={currentEscala!.data_turno}
                {...register("data_turno")}
                error={errors.data_turno as { message: string } | undefined}
              >
                {/* <option value="">Selecione o turno</option> */}
                <option value="MANHA">Manhã</option>
                <option value="TARDE">Tarde</option>
                <option value="NOITE">Noite</option>
              </Input>
  

              <Input 
                title="Descricao" 
                type="text" 
                placeholder="Alguma observação? Coloque aqui uma descrição" 
                {...register("descricao")} 
                error={errors.descricao as { message: string } | undefined}/>   

              <StyledButton type="submit">Editar escala</StyledButton>
          </Form>
      </Modal>
  )
}