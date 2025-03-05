import { Table } from "rsuite";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Professor } from "../../../pages/Home/interface";

const { Column, HeaderCell, Cell } = Table;

interface ProfessoresTableProps {
  professores: Professor[];
  onEdit: (professor: Professor) => void;
  onRemove: (professor: Professor) => void;
}

export const ProfessoresTable = ({
  professores,
  onEdit,
  onRemove,
}: ProfessoresTableProps) => {
  return (
    <Table
      height={400}
      data={professores}
      onRowClick={(rowData) => console.log(rowData)}
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
        <Cell>
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
              onClick={() => onEdit(rowData as Professor)}
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
              onClick={() => onRemove(rowData as Professor)}
            />
          )}
        </Cell>
      </Column>
    </Table>
  );
};
