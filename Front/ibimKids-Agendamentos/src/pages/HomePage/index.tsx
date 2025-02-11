import { StyledTitle } from "../../styles/typography"
import { StyledContainer } from "./style"
import { CardEscala } from "../../components/EscalasComponents/EscalasList/EscalaCard";
import { CardProfessor } from "../../components/ProfessoresComponents/ProfessoresList/ProfessorCard";

import { AddEscalaModal } from "../../components/EscalasComponents/EscalasModals/EscalaAddModal";
import { EditEscalaModal } from "../../components/EscalasComponents/EscalasModals/EscalaEditModal";
import { RemoveEscalaModal } from "../../components/EscalasComponents/EscalasModals/RemoveModal";

import { AddProfessorModal } from "../../components/ProfessoresComponents/ProfessoresModals/ProfessorAddModal";
import { EditProfessorModal } from "../../components/ProfessoresComponents/ProfessoresModals/ProfessorEditModal";
import { RemoveProfessorModal } from "../../components/ProfessoresComponents/ProfessoresModals/RemoveModal";

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

export interface Escala {
    id: string;
    nome: string;
    descricao: string;
    faixa_etaria: string;
    limite: string;
    data_escala: string;
    data_turno: string;
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
    const { user, userLogout, isOpenEditUser, setIsOpenEditUser, setIsOpenRemoveUser, isOpenRemoveUser } = useContext(UserContext)
    const { escalas, setEscalas, setIsOpenAddEscala, setIsOpenEditEscala, isOpenAddEscala, isOpenEditEscala, isOpenRemoveEscala, setIsOpenRemoveEscala } = useContext(EscalasListContext)
    const { professores, setProfessores, setIsOpenAddProf, setIsOpenEditProf, isOpenAddProf, isOpenEditProf, isOpenRemoveProf, setIsOpenRemoveProf } = useContext(ProfessoresListContext)
    const { agendamentos, setAgendamentos } = useContext(AgendamentosListContext)

    const [editingEscalaId, setEditingEscalaId] = useState<string | null>(null);
    const [removingEscalaId, setRemovingEscalaId] = useState<string | null>(null);

    const [editingProfessorId, setEditingProfessorId] = useState<string | null>(null);
    const [removingProfessorId, setRemovingProfessorId] = useState<string | null>(null);



    useEffect(() => {
        (
            async () => {
                const responseEscalas = await api.get("/escalas");
                setEscalas(responseEscalas.data);

                const responseProf = await api.get("/professores");
                setProfessores(responseProf.data);

                const responseAgendamento = await api.get("/agendamentos")
                console.log(responseAgendamento.data)
                setAgendamentos(responseAgendamento.data)

            }
        )()
    }, [])
      

    const toggleModalAddEscala = () => setIsOpenAddEscala(!isOpenAddEscala)
    const toggleModalEditEscala = () => setIsOpenEditEscala(!isOpenEditEscala)
    const toggleModalRemoveEscala = () => setIsOpenRemoveEscala(!isOpenRemoveEscala)

    const toggleModalAddProf = () => setIsOpenAddProf(!isOpenAddProf)
    const toggleModalEditProf = () => setIsOpenEditProf(!isOpenEditProf)
    const toggleModalRemoveProf = () => setIsOpenRemoveProf(!isOpenRemoveProf)

    const toggleModalEditUser = () => setIsOpenEditUser(!isOpenEditUser)
    const toggleModalRemoveUser = () => setIsOpenRemoveUser(!isOpenRemoveUser)


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


    const renderEscalas = (escalasToRender: Escala[]) => escalasToRender.map(escala => <CardEscala key={escala.id} escala={escala} 
        editEscala={() => handleEditEscala(escala)} removeEscala={() => handleRemoveEscala(escala)
        }/>)

    const renderProfessores = (professoresToRender: Professor[]) => professoresToRender.map(professor => <CardProfessor key={professor.id} professor={professor} 
        editProfessor={() => handleEditProfessor(professor)} removeProfessor={() => handleRemoveProfessor(professor)
        }/>)
        
    // const renderAgendamentos = (agendamentosToRender: Professor[]) => agendamentosToRender.map(agendamento => <CardAgendamento key={agendamento.id} professor={agendamento} 
    //     editProfessor={() => handleEditProfessor(agendamento)} removeAgendamento={() => handleRemoveProfessor(agendamento)
    //     }/>)


    return(
        <StyledContainer>
            
            <div className="formBox">

                <div className="navBar">
                    <StyledLogo>Ibim <span>Kids</span> Escalas</StyledLogo>
                    <Link onClick={(e) => {userLogout(e)}} to="/">Sair</Link>
                </div>


                <section className="headerSection">
                    <header>
                            <StyledTitle>{user.nome}</StyledTitle>
                            <div>
                                <MdEdit style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={toggleModalEditUser}/>
                                <FaTrashAlt style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={toggleModalRemoveUser}/>
                            </div>

                    </header>
                </section>
                
                <div className="principalContent">
                    <section>
                        <StyledTitle>Atualmente <span>{escalas.length}</span> escalas</StyledTitle>

                        <FaPlusCircle style={{ width: '20px', height: '20px', cursor: 'pointer'}} type="button" onClick={toggleModalAddEscala}/>

                    </section>
                    <ul>
                        {renderEscalas(escalas)}
                    </ul>


                    <section>
                        <StyledTitle>Atualmente <span>{professores.length}</span> professores</StyledTitle>

                        <FaPlusCircle style={{ width: '20px', height: '20px', cursor: 'pointer'}} type="button" onClick={toggleModalAddProf}/>

                    </section>
                    <ul>
                        {renderProfessores(professores)}
                    </ul>

                    {/* <section>
                        <StyledTitle>Atualmente <span>{agendamentos.length}</span> professores</StyledTitle>

                        <FaPlusCircle style={{ width: '20px', height: '20px', cursor: 'pointer'}} type="button" onClick={toggleModalAddProf}/>

                    </section> */}
                    {/* <ul>
                        {renderAgendamentos(agendamentos)}
                    </ul> */}

                </div>


                {isOpenAddEscala && <AddEscalaModal toggleModalEscala={toggleModalAddEscala} setIsOpenAddEscala={setIsOpenAddEscala} />}

                {isOpenEditEscala && (
                <EditEscalaModal
                    toggleModalEscala={toggleModalEditEscala}
                    setIsOpenEdit={setIsOpenEditEscala}
                    escalaId={editingEscalaId || ''}
                />
                )}
                {
                isOpenRemoveEscala && <RemoveEscalaModal toggleModalEscala={toggleModalRemoveEscala} setIsOpenRemoveEscala={setIsOpenRemoveEscala} escalaId={removingEscalaId || ''} />
                }

                {isOpenAddProf && <AddProfessorModal toggleModalProf={toggleModalAddProf} setIsOpenAddProf={setIsOpenAddProf} />}

                {isOpenEditProf && (
                <EditProfessorModal
                    toggleModalProf={toggleModalEditProf}
                    setIsOpenEditProf={setIsOpenEditProf}
                    professorId={editingProfessorId || ''}
                />
                )}
                {
                isOpenRemoveProf && <RemoveProfessorModal toggleModalProf={toggleModalRemoveProf} setIsOpenRemoveProf={setIsOpenRemoveProf} professorId={removingProfessorId || ''} />
                }

                {isOpenEditUser && <UserEditModal toggleModalUser={toggleModalEditUser} setIsOpenEditUser={setIsOpenEditUser} clientId={user.id || ''}/>}

                {isOpenRemoveUser && <RemoveUserModal toggleModalUser={toggleModalRemoveUser} setIsOpenRemoveUser={setIsOpenRemoveUser} clientId={user.id || ''}/>}

            </div>
        </StyledContainer>
    )
}