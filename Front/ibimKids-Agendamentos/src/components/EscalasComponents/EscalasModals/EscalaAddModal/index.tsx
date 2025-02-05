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

interface ModalAddTaskProps {
  toggleModalEscala: () => void;
  setIsOpenAddEscala: Dispatch<SetStateAction<boolean>>;
}

interface Professor {
  id: string;
  nome: string;
}

export const AddEscalaModal = ({ toggleModalEscala, setIsOpenAddEscala }: ModalAddTaskProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TEscalaSchema>({
    resolver: zodResolver(escalaSchema), mode: "onChange"
  });

  const { addEscala } = useContext(EscalasListContext);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [professorIds, setProfessorIds] = useState<string[]>([]);

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

  const handleSelectProfessores = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setProfessorIds(selectedOptions);
    setValue("professorIds", selectedOptions as any); // Atualiza o valor no formulário
  };

  const createEscala = async (data: TEscalaSchema) => {
    const formData = {
      ...data,
      professorIds, // Incluindo os IDs dos professores selecionados
    };
    
    addEscala(formData);
    setIsOpenAddEscala(false);
  };

  return (
    <Modal toggleModal={toggleModalEscala}>
      <Form onSubmit={handleSubmit(createEscala)}>
        <StyledTitle>Adicione uma nova Escala</StyledTitle>

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

        {/* Campo de Seleção Múltipla para Professores */}
        <label>Professores</label>
        <select multiple onChange={handleSelectProfessores}>
          {professores.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.nome}
            </option>
          ))}
       </select>

        <Input 
          title="Descrição" 
          type="text" 
          placeholder="Alguma observação? Coloque aqui uma descrição" 
          {...register("descricao")} 
          error={errors.descricao as { message: string } | undefined}
        />

        <StyledButton type="submit">Registrar escala</StyledButton>
      </Form>
    </Modal>
  );
};




// import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { TEscalaSchema, escalaSchema } from "./schema"
// import { Modal } from "../Modal"
// import { Form } from "./style"
// import { EscalasListContext } from "../../../../providers/EscalasListContext"
// import { Input } from "../../../RegisterForm/Input"
// import { StyledButton } from "../../../Button/Button"
// import { StyledTitle } from "../../../../styles/typography"
// import api from "../../../../services/api";


// interface ModalAddTaskProps {
//   toggleModalEscala: () => void
//   setIsOpenAddEscala: Dispatch<SetStateAction<boolean>>
// }

// interface Professor {
//   id: string;
//   nome: string;
// }

// export const AddEscalaModal = ({ toggleModalEscala, setIsOpenAddEscala }: ModalAddTaskProps) => {
//   const { register, handleSubmit, formState: {errors}   } = useForm<TEscalaSchema>({
//       resolver: zodResolver(escalaSchema), mode: "onChange"
//   })
//   const { addEscala } = useContext(EscalasListContext)

//   const [professores, setProfessores] = useState<Professor[]>([]);
//   const [professorIds, setProfessorIds] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchProfessores = async () => {
//       try {
//         const { data } = await api.get("/professores");
//         setProfessores(data);
//       } catch (error) {
//         console.error("Erro ao buscar professores:", error);
//       }
//     };

//     fetchProfessores();
//   }, []);


//   const handleSelectProfessores = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
//     setProfessorIds(selectedOptions);
//     setValue("professorIds", selectedOptions as any); // Atualiza o valor no formulário
//   };

//   const createEscala = async (data: TEscalaSchema) => {
//     addEscala(data)
//     setIsOpenAddEscala(false)
//   }


//   return (
//       <Modal toggleModal={toggleModalEscala}>

//           <Form onSubmit={handleSubmit(createEscala)}>
//               <StyledTitle>Adicione uma nova Escala</StyledTitle>
//               <Input 
//                 title="Nome" 
//                 type="text" 
//                 placeholder="Digite aqui o nome da escala" 
//                 {...register("nome")} 
//                 error={errors.nome as { message: string } | undefined}/>

//               <Input 
//                 id="faixa_etaria"
//                 title="Faixa Estária" 
//                 type="text" 
//                 placeholder="Digite aqui a faixa etária" 
//                 {...register("faixa_etaria")} 
//                 error={errors.faixa_etaria as { message: string } | undefined}/>

//               <Input 
//                 id="limite"
//                 title="Limite" 
//                 type="text" 
//                 placeholder="Digite aqui o limite" 
//                 {...register("limite")} 
//                 error={errors.limite as { message: string } | undefined}/>

//               <Input 
//                 title="Data" 
//                 type="date" 
//                 min={new Date().toISOString().split("T")[0]} 
//                 placeholder="Digite aqui a data da escala" 
//                 {...register("data_escala")} 
//                 error={errors.data_escala as { message: string } | undefined}/>   

//               <Input 
//                 title="Turno"
//                 as="select" // Mudando de input para select
//                 {...register("data_turno")}
//                 error={errors.data_turno as { message: string } | undefined}
//               >
//                 <option value="">Selecione o turno</option>
//                 <option value="MANHA">Manhã</option>
//                 <option value="TARDE">Tarde</option>
//                 <option value="NOITE">Noite</option>
//               </Input>
  

//               {/* Campo de Seleção Múltipla para Professores */}
//               <label>Professores</label>
//               <select multiple onChange={handleSelectProfessores}>
//                 {professores.map((prof) => (
//                   <option key={prof.id} value={prof.id}>
//                     {prof.nome}
//                   </option>
//                 ))}
//               </select>

//               <Input 
//                 title="Descricao" 
//                 type="text" 
//                 placeholder="Alguma observação? Coloque aqui uma descrição" 
//                 {...register("descricao")} 
//                 error={errors.descricao as { message: string } | undefined}/>      

//               <StyledButton type="submit">Registrar escala</StyledButton>
//           </Form>
//       </Modal>
//   )
// }