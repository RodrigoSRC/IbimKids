import { Professor } from "../../../../pages/HomePage"
import { Container } from "./styles"
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";



interface CardProps {
    professor: Professor
    editProfessor: (id: string) => void;
    removeProfessor: (id: string) => void;
}

export const CardProfessor = ({ professor, editProfessor, removeProfessor}: CardProps) => {

    return (
        <Container>
            <div className="infos">
                <h3 className="nome">{professor.nome}</h3>
                <div className="professores">
                    <p>{professor.telefone}</p>
                </div>
            </div>

            <div className="buttons">
                <MdEdit style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer'}} onClick={() => editProfessor(professor.id)}/>
                <FaTrashAlt style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer'}} onClick={() => removeProfessor(professor.id)} />
            </div>
            
        </Container>
    )

}