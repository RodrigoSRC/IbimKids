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