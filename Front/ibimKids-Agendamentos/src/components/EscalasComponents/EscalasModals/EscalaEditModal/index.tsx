import { useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TEscalaSchema, escalaSchema } from "./schema"
import { EscalasListContext } from "../../../../providers/EscalasListContext"
import { api }from "../../../../services/api";
import {
  TagPicker, Input, Button, Form, Modal,
  Radio,
  RadioGroup
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { ProfessoresListContext } from "../../../../providers/ProfessoresListContext"
import { ModalEditTaskProps, Professor } from "./interface"


export const EditEscalaModal = ({ isOpenEditEscala, setIsOpenEdit, escalaId  }: ModalEditTaskProps) => {
  const { register, handleSubmit, watch, formState: {errors}, setValue   } = useForm<TEscalaSchema>({
    resolver: zodResolver(escalaSchema), mode: "onChange"
})
  const { editEscala, escalas } = useContext(EscalasListContext)
  const {professores} = useContext(ProfessoresListContext)
    const [professorIds, setProfessorIds] = useState<string[]>([]);
    const [isTagPickerOpen, setIsTagPickerOpen] = useState(false); 
    
      useEffect(() => {
        const fetchEscala = async () => {
          if (!escalaId) return;
      
          try {
            const { data } = await api.get(`/escalas/${escalaId}`);
      
            setValue("nome", data.nome);
            setValue("faixa_etaria", data.faixa_etaria);
            setValue("limite", data.limite);
            setValue("data_escala", data.data_escala);
            setValue("data_turno", data.data_turno);
            setValue("descricao", data.descricao);
      
            // Ajustando professores
            const escalaProfessoresIds = data.professores.map((prof: Professor) => prof.id);
            // console.log(escalaProfessoresIds)
            setProfessorIds(escalaProfessoresIds);
            setValue("professorIds", escalaProfessoresIds);
          } catch (error) {
            console.error("Erro ao buscar escala:", error);
          }
        };
      
        fetchEscala();
      }, [escalaId, setValue]);
      
      

  const currentEscala = escalas.find(escala => escala.id === escalaId)


  const onSubmit = async (data: TEscalaSchema, e: any) => {
    // e.preventDefault()
    try {
      await editEscala(data, escalaId);
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Erro ao editar a escala", error);
    }
  };


  return (
      <Modal open={isOpenEditEscala} onClose={() => setIsOpenEdit(false)}>
          <Modal.Header>
            <Modal.Title>Adicionar Nova Escala</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form
              onSubmit={(_, event) => {
                event?.preventDefault();
                handleSubmit(onSubmit)();
              }}
            >
              <TagPicker
                size="lg"
                block
                data={professores.map(prof => ({ label: prof.nome, value: prof.id }))}
                value={professorIds} // Define os professores selecionados
                onChange={(values) => {
                  setProfessorIds(values); 
                  setValue("professorIds", values);
                }}
                onOpen={() => setIsTagPickerOpen(true)}
                onClose={() => setIsTagPickerOpen(false)}
                placeholder="Professores"
              />

              <Input 
                title="Nome" 
                type="text" 
                defaultValue={currentEscala!.nome}
                placeholder="Digite aqui o nome" 
                {...register("nome")} 
                error={errors.nome as { message: string } | undefined}/>

              <Form.Group controlId="crianca_idade">
                <RadioGroup
                  name="faixa_etaria"
                  inline
                  defaultValue={currentEscala!.faixa_etaria}
                  value={watch("faixa_etaria")} // Certifica que o valor selecionado está atualizado
                  onChange={(value) => setValue("faixa_etaria", value, { shouldValidate: true })}
                >
                  <Radio value="BERÇARIO">1 a 3 anos</Radio>
                  <Radio value="INFANTIL">3 a 5 anos</Radio>
                  <Radio value="JUVENIL">5 a 10 anos</Radio>
                </RadioGroup>

                {errors.faixa_etaria?.message && (
                  <Form.HelpText style={{ color: "red" }}>
                    {errors.faixa_etaria.message}
                  </Form.HelpText>
                )}
              </Form.Group>


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

              <Button appearance="primary" type="submit">Editar escala</Button>
          </Form>
        </Modal.Body>
      </Modal>
  )
}