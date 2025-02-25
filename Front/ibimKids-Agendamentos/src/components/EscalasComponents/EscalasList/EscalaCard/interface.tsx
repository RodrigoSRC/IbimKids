import { Escala } from "../../../../pages/HomePage/interface";

export interface CardProps {
    escala: Escala
    editEscala: (id: string) => void;
    removeEscala: (id: string) => void;
}