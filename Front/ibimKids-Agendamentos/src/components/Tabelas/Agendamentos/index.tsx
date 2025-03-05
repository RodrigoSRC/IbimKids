// import isBefore from 'date-fns/isBefore';
import { Table } from "rsuite";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Agendamento } from "../../../pages/Home/interface";

const { Column, HeaderCell, Cell } = Table;

interface AgendamentosTableProps {
  agendamentos: Agendamento[];
  onEdit: (agendamento: Agendamento) => void;
  onRemove: (agendamento: Agendamento) => void;
}

export const AgendamentosTable = ({
  agendamentos, 
  onEdit,
  onRemove,
}: AgendamentosTableProps) => {
  return (
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
          onClick={() => onEdit(rowData as Agendamento)}
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
          onClick={() => onRemove(rowData as Agendamento)}
        />
      )}
    </Cell>
  </Column>
</Table>
  )
}

