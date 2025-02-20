import { StyledTitle } from "../../styles/typography";
import { StyledContainer } from "./style";

import { AddEscalaModal } from "../../components/EscalasComponents/EscalasModals/EscalaAddModal";
import { EditEscalaModal } from "../../components/EscalasComponents/EscalasModals/EscalaEditModal";
import { RemoveEscalaModal } from "../../components/EscalasComponents/EscalasModals/RemoveModal";

import { AddProfessorModal } from "../../components/ProfessoresComponents/ProfessoresModals/ProfessorAddModal";
import { EditProfessorModal } from "../../components/ProfessoresComponents/ProfessoresModals/ProfessorEditModal";
import { RemoveProfessorModal } from "../../components/ProfessoresComponents/ProfessoresModals/RemoveModal";

import { EditAgendamentoModal } from "../../components/AgendamentoComponents/AgendamentoModais/EditModal";
import { RemoveAgendamentoModal } from "../../components/AgendamentoComponents/AgendamentoModais/RemoveModal";

import { UserEditModal } from "../../components/UserComponents/UserModals/UserEditModal";
import { RemoveUserModal } from "../../components/UserComponents/UserModals/UserRemoveModal";

import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../providers/UserContext";
import { EscalasListContext } from "../../providers/EscalasListContext";
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

import { StyledLogo } from "../../styles/typography";
import { ProfessoresListContext } from "../../providers/ProfessoresListContext";
import { AgendamentosListContext } from "../../providers/AgendamentosListContext";
import isBefore from 'date-fns/isBefore';

import {
  Calendar,
  List,
  Badge,
  HStack,
  IconButton,
  Table,
  Button,
  Content,
} from "rsuite";
const { Column, HeaderCell, Cell } = Table;

export interface Escala {
  id: string;
  nome: string;
  descricao: string;
  faixa_etaria: string;
  limite: string;
  data_escala: string;
  data_turno: string;
  // professores: [];
}

export interface Professor {
  id: string;
  nome: string;
  telefone: string;
}

export interface Agendamento {
  id: string;
  crianca_nome: string;
  crianca_idade: string;
  responsavel_nome: string;
  telefone: string;
  observacao: string;
}

export const HomePage = () => {
  const {
    user,
    userLogout,
    isOpenEditUser,
    setIsOpenEditUser,
    setIsOpenRemoveUser,
    isOpenRemoveUser,
  } = useContext(UserContext);
  const {
    escalas,
    setEscalas,
    setIsOpenAddEscala,
    setIsOpenEditEscala,
    isOpenAddEscala,
    isOpenEditEscala,
    isOpenRemoveEscala,
    setIsOpenRemoveEscala,
  } = useContext(EscalasListContext);
  const {
    professores,
    setProfessores,
    setIsOpenAddProf,
    setIsOpenEditProf,
    isOpenAddProf,
    isOpenEditProf,
    isOpenRemoveProf,
    setIsOpenRemoveProf,
  } = useContext(ProfessoresListContext);
  const {
    agendamentos,
    setAgendamentos,
    isOpenEditAgendamento,
    setIsOpenEditAgendamento,
    isOpenRemoveAgendamento,
    setIsOpenRemoveAgendamento,
  } = useContext(AgendamentosListContext);

  const [editingEscalaId, setEditingEscalaId] = useState<string | null>(null);
  const [removingEscalaId, setRemovingEscalaId] = useState<string | null>(null);

  const [editingProfessorId, setEditingProfessorId] = useState<string | null>(
    null
  );
  const [removingProfessorId, setRemovingProfessorId] = useState<string | null>(
    null
  );

  const [editingAgendamentoId, setEditingAgendamentoId] = useState<string | null>(
    null
  );
  const [removingAgendamentoId, setRemovingAgendamentoId] = useState<string | null>(
    null
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    (async () => {
      const responseEscalas = await api.get("/escalas");
      setEscalas(responseEscalas.data);

      const responseProf = await api.get("/professores");
      setProfessores(responseProf.data);

      const responseAgendamento = await api.get("/agendamentos");
      console.log(responseAgendamento.data);
      setAgendamentos(responseAgendamento.data);
    })();
  }, []);

  const toggleModalAddEscala = () => setIsOpenAddEscala(!isOpenAddEscala);
  const toggleModalEditEscala = () => setIsOpenEditEscala(!isOpenEditEscala);
  const toggleModalRemoveEscala = () =>
    setIsOpenRemoveEscala(!isOpenRemoveEscala);

  const toggleModalAddProf = () => setIsOpenAddProf(!isOpenAddProf);
  const toggleModalEditProf = () => setIsOpenEditProf(!isOpenEditProf);
  const toggleModalRemoveProf = () => setIsOpenRemoveProf(!isOpenRemoveProf);

  const toggleModalEditUser = () => setIsOpenEditUser(!isOpenEditUser);
  const toggleModalRemoveUser = () => setIsOpenRemoveUser(!isOpenRemoveUser);

  const toggleModalEditAgendamento = () =>
    setIsOpenEditAgendamento(!isOpenEditAgendamento);
  const toggleModalRemoveAgendamento = () =>
    setIsOpenRemoveAgendamento(!isOpenRemoveAgendamento);

  const handleEditEscala = (escala: Escala) => {
    setEditingEscalaId(escala.id);
    toggleModalEditEscala();
  };
  const handleRemoveEscala = (escala: Escala) => {
    setRemovingEscalaId(escala.id);
    toggleModalRemoveEscala();
  };

  const handleEditProfessor = (professor: Professor) => {
    setEditingProfessorId(professor.id);
    toggleModalEditProf();
  };
  const handleRemoveProfessor = (professor: Professor) => {
      setRemovingProfessorId(professor.id);
      toggleModalRemoveProf();
    };
    
    const handleEditAgendamento = (agendamento: Agendamento) => {
        console.log(agendamento)
      setEditingAgendamentoId(agendamento.id);
      toggleModalEditAgendamento();
    };
  const handleRemoveAgendamento = (agendamento: Agendamento) => {
    setRemovingAgendamentoId(agendamento.id);
    toggleModalRemoveAgendamento();
  };

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const getEscalasByDate = (date: Date) => {
    if (!date) return [];

    return escalas.filter((escala) => {
      // Se for uma string no formato "YYYY-MM-DD", divida e crie um objeto Date local
      const [year, month, day] = escala.data_escala.split("-").map(Number);
      const escalaDate = new Date(year, month - 1, day); // Mês começa do 0 no JS

      return (
        escalaDate.getFullYear() === date.getFullYear() &&
        escalaDate.getMonth() === date.getMonth() &&
        escalaDate.getDate() === date.getDate()
      );
    });
  };

  const renderCell = (date: Date) => {
    const escalasDoDia = getEscalasByDate(date);

    if (escalasDoDia.length > 0) {
      return <Badge className="calendar-todo-item-badge" color="blue" />;
    }

    return null;
  };

  const EscalaList = ({ date }: { date: Date | null }) => {
    if (!date) return null;

    const escalasFiltradas = getEscalasByDate(date);

    if (!escalasFiltradas.length) return null;

    return (
      <List style={{ flex: 1 }} bordered>
        {escalasFiltradas.map((escala) => (
          <List.Item
            key={escala.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div>
                <strong>{escala.nome}</strong>
              </div>
              <div>{escala.descricao}</div>
              <div>Faixa etária: {escala.faixa_etaria}</div>
              <div>Turno: {escala.data_turno}</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <IconButton
                icon={<MdEdit />}
                onClick={() => handleEditEscala(escala)}
              />
              <IconButton
                icon={<FaTrashAlt />}
                onClick={() => handleRemoveEscala(escala)}
              />
            </div>
          </List.Item>
        ))}
      </List>
    );
  };

  return (
    <StyledContainer>
      <div className="formBox">
        <div className="navBar">
          <StyledLogo>
            Ibim <span>Kids</span> Escalas
          </StyledLogo>
          <Link
            onClick={(e) => {
              userLogout(e);
            }}
            to="/"
          >
            Sair
          </Link>
        </div>

        <section className="headerSection">
          <header>
            <StyledTitle>{user.nome}</StyledTitle>
            <div>
              <MdEdit
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                onClick={toggleModalEditUser}
              />
              <FaTrashAlt
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                onClick={toggleModalRemoveUser}
              />
            </div>
          </header>
        </section>

        <div className="principalContent">
          <section>
            <StyledTitle>
              Atualmente <span>{escalas.length}</span> escalas
            </StyledTitle>

            <FaPlusCircle
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              type="button"
              onClick={toggleModalAddEscala}
            />
          </section>
          <HStack
            spacing={10}
            style={{ height: 320 }}
            alignItems="flex-start"
            wrap
          >
            <Calendar
              compact
            //   shouldDisableDate={(date: Date) => isBefore(date, new Date())}
              renderCell={renderCell}
              onSelect={handleSelect}
              style={{ width: 320 }}
            />
            <EscalaList date={selectedDate} />
          </HStack>

          <section>
            <StyledTitle>
              Atualmente <span>{professores.length}</span> professores
            </StyledTitle>

            <FaPlusCircle
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              type="button"
              onClick={toggleModalAddProf}
            />
          </section>

          <Table
            height={400}
            // width={700}
            data={professores}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={200} align="center" fixed>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="nome" />
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>Telefone</HeaderCell>
              <Cell dataKey="telefone" />
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>Data Registrada</HeaderCell>
              <Cell dataKey="data_registrada">
                {(rowData) =>
                  new Date(rowData.data_registrada).toLocaleDateString("pt-BR")
                }
              </Cell>
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>N° de escalas</HeaderCell>
              <Cell>{(rowData) => rowData.escalas?.length || 0}</Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>&nbsp;</HeaderCell>
              <Cell></Cell>
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>Editar</HeaderCell>
              <Cell>
                {(rowData) => (
                  <MdEdit
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    onClick={() => handleEditProfessor(rowData as Professor)}
                  />
                )}
              </Cell>
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>Excluir</HeaderCell>
              <Cell>
                {(rowData) => (
                  <FaTrashAlt
                    style={{ width: "15px", height: "15px", cursor: "pointer" }}
                    onClick={() => handleRemoveProfessor(rowData as Professor)}
                  />
                )}
              </Cell>
            </Column>
            {/* <Column flexGrow={1}>
              <HeaderCell>&nbsp;</HeaderCell>
              <Cell></Cell>
            </Column> */}
          </Table>

          <section>
            <StyledTitle>
              Atualmente <span>{agendamentos.length}</span> agendamentos
            </StyledTitle>

            {/* <FaPlusCircle style={{ width: '20px', height: '20px', cursor: 'pointer'}} type="button" onClick={toggleModalAddProf}/> */}
          </section>
          <Table
            height={400}
            // width={700}
            data={agendamentos}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={200} align="center" fixed>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="crianca_nome" />
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>Idade</HeaderCell>
              <Cell dataKey="crianca_idade" />
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>Responsável</HeaderCell>
              <Cell dataKey="responsavel_nome" />
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>Telefone</HeaderCell>
              <Cell dataKey="telefone" />
            </Column>
            <Column width={200} align="center" fixed>
              <HeaderCell>Observação</HeaderCell>
              <Cell dataKey="observacao" />
            </Column>
            {/* <Column width={200} align="center" fixed>
              <HeaderCell>Data Registrada</HeaderCell>
              <Cell dataKey="data_registrada">
                {(rowData) =>
                  new Date(rowData.data_registrada).toLocaleDateString("pt-BR")
                }
              </Cell>
            </Column> */}
            <Column flexGrow={1}>
              <HeaderCell>&nbsp;</HeaderCell>
              <Cell></Cell>
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>Editar</HeaderCell>
              <Cell>
                {(rowData) => (
                  <MdEdit
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    onClick={() => handleEditAgendamento(rowData as Agendamento)}
                  />
                )}
              </Cell>
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>Excluir</HeaderCell>
              <Cell>
                {(rowData) => (
                  <FaTrashAlt
                    style={{ width: "15px", height: "15px", cursor: "pointer" }}
                    onClick={() =>
                      handleRemoveAgendamento(rowData as Agendamento)
                    }
                  />
                )}
              </Cell>
            </Column>

          </Table>
        </div>

        {isOpenAddEscala && (
          <AddEscalaModal
            toggleModalEscala={toggleModalAddEscala}
            setIsOpenAddEscala={setIsOpenAddEscala}
          />
        )}

        {isOpenEditEscala && (
          <EditEscalaModal
            toggleModalEscala={toggleModalEditEscala}
            setIsOpenEdit={setIsOpenEditEscala}
            escalaId={editingEscalaId || ""}
          />
        )}
        {isOpenRemoveEscala && (
          <RemoveEscalaModal
            toggleModalEscala={toggleModalRemoveEscala}
            setIsOpenRemoveEscala={setIsOpenRemoveEscala}
            escalaId={removingEscalaId || ""}
          />
        )}

        {isOpenAddProf && (
          <AddProfessorModal
            toggleModalProf={toggleModalAddProf}
            setIsOpenAddProf={setIsOpenAddProf}
          />
        )}

        {isOpenEditProf && (
          <EditProfessorModal
            toggleModalProf={toggleModalEditProf}
            setIsOpenEditProf={setIsOpenEditProf}
            professorId={editingProfessorId || ""}
          />
        )}
        {isOpenRemoveProf && (
          <RemoveProfessorModal
            toggleModalProf={toggleModalRemoveProf}
            setIsOpenRemoveProf={setIsOpenRemoveProf}
            professorId={removingProfessorId || ""}
          />
        )}


        {isOpenEditAgendamento && (
          <EditAgendamentoModal
            toggleModalAgendamento={toggleModalEditAgendamento}
            setIsOpenEditAgendamento={setIsOpenEditAgendamento}
            agendamentoId={editingAgendamentoId || ""}
          />
        )}

        {isOpenRemoveAgendamento && (
          <RemoveAgendamentoModal
            toggleModalAgendamento={toggleModalRemoveAgendamento}
            setIsOpenRemoveAgendamento={setIsOpenRemoveAgendamento}
            agendamentoId={removingAgendamentoId || ""}
          />
        )}

        {isOpenEditUser && (
          <UserEditModal
            toggleModalUser={toggleModalEditUser}
            setIsOpenEditUser={setIsOpenEditUser}
            clientId={user.id || ""}
          />
        )}

        {isOpenRemoveUser && (
          <RemoveUserModal
            toggleModalUser={toggleModalRemoveUser}
            setIsOpenRemoveUser={setIsOpenRemoveUser}
            clientId={user.id || ""}
          />
        )}
      </div>
    </StyledContainer>
  );
};
