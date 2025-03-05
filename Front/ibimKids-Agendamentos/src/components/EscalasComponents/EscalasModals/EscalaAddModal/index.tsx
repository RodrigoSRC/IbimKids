import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEscalaSchema, escalaSchema } from "./schema";
import { EscalasListContext } from "../../../../providers/EscalasListContext";
import { Modal, TagPicker, Input, Button, Form, Radio, RadioGroup } from "rsuite";
import { ModalAddTaskProps, Professor } from "./interface";
import { api } from "../../../../services/api";
import "rsuite/dist/rsuite.min.css";

export const AddEscalaModal = ({
  isOpenAddEscala,
  setIsOpenAddEscala,
}: ModalAddTaskProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<TEscalaSchema>({
    resolver: zodResolver(escalaSchema),
    mode: "onChange",
  });

  const { addEscala } = useContext(EscalasListContext);
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

  const createEscala = async (data: TEscalaSchema) => {
    const formData = { ...data, professorIds };
    addEscala(formData);
    setIsOpenAddEscala(false);
  };

  return (
    <Modal open={isOpenAddEscala} onClose={() => setIsOpenAddEscala(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Nova Escala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(_, event) => {
            event?.preventDefault();
            handleSubmit(createEscala)();
          }}
        >
          <TagPicker
            size="lg"
            block
            data={professores.map((prof) => ({
              label: prof.nome,
              value: prof.id,
            }))}
            value={professorIds}
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
            placeholder="Digite aqui o nome da escala"
            {...register("nome")}
            error={
              errors.nome
                ? { message: errors.nome.message ?? "" }
                : undefined
            }
          />



          <Form.Group controlId="crianca_idade">
            <RadioGroup
              name="faixa_etaria"
              inline
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

          <Form.Group controlId="crianca_idade">
            <RadioGroup
              name="faixa_etaria"
              inline
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
            title="Limite"
            type="text"
            placeholder="Digite aqui o limite"
            {...register("limite")}
            error={
              errors.limite
                ? { message: errors.limite.message ?? "" }
                : undefined
            }
          />

          <Input
            title="Data"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("data_escala")}
            error={
              errors.data_escala
                ? { message: errors.data_escala.message ?? "" }
                : undefined
            }
          />

          <Input
            title="Turno"
            as="select"
            {...register("data_turno")}
            error={
              errors.data_turno
                ? { message: errors.data_turno.message ?? "" }
                : undefined
            }
          >
            <option value="">Selecione o turno</option>
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
          </Input>

          <Input
            title="Observação"
            type="text"
            as="textarea"
            rows={4}
            placeholder="Alguma observação?"
            {...register("descricao")}
            error={
              errors.descricao
                ? { message: errors.descricao.message ?? "" }
                : undefined
            }
          />

          <Button appearance="primary" type="submit">
            Registrar escala
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
