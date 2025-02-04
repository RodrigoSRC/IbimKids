import { Escala } from "../../../../pages/HomePage"
import { Container } from "./styles"
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";



interface CardProps {
    escala: Escala
    editEscala: (id: string) => void;
    removeEscala: (id: string) => void;
}



export const CardEscala = ({ escala, editEscala, removeEscala}: CardProps) => {
    const formatarData = (data: string) => {
        return format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
    };

    return (
        <Container>
            <div className="infos">
                <h3 className="nome">{escala.nome}</h3>
                <div className="escalas">
                    <p>{formatarData(escala.data_escala)}</p>
                    <p>{escala.data_turno}</p>
                    <p>{escala.limite}</p>
                </div>
            </div>

            <div className="buttons">
                <MdEdit 
                    style={{ width: '20px', height: '20px', cursor: 'pointer'}} 
                    onClick={() => editEscala(escala.id)}
                />
                <FaTrashAlt 
                    style={{ width: '20px', height: '20px', cursor: 'pointer'}} 
                    onClick={() => removeEscala(escala.id)} 
                />
            </div>
        </Container>
    );
};
