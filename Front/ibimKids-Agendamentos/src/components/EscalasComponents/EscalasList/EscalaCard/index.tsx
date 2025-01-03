import { Escala } from "../../../../pages/HomePage"
import { Container } from "./styles"
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";



interface CardProps {
    escala: Escala
    editEscala: (id: string) => void;
    removeEscala: (id: string) => void;
}

export const CardEscala = ({ escala, editEscala, removeEscala}: CardProps) => {

    return (
        <Container>
            <div className="infos">
                <h3 className="nome">{escala.nome}</h3>
                <div className="escalas">
                    <p>{escala.data_escala}</p>
                    <p>
                        {escala.data_turno}
                    </p>
                    <p>
                        {escala.limite}
                    </p>

                </div>
            </div>

            <div className="buttons">
                <MdEdit style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => editEscala(escala.id)}/>
                <FaTrashAlt style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => removeEscala(escala.id)} />
            </div>
            
        </Container>
    )

}