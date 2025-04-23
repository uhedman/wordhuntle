import { Table } from "react-bootstrap";
import { UserScore } from "@/features/ranking/types";

const ScoreTable = ({ list }: { list: UserScore[] }) => {
  return (
    <Table
      striped
      bordered
      hover
      style={{ wordBreak: "break-word", tableLayout: "fixed", width: "100%" }}
    >
      <thead>
        <tr>
          <th style={{ width: "2rem" }}>#</th>
          <th>Usuario</th>
          <th>Puntaje</th>
        </tr>
      </thead>
      <tbody>
        {list.map((user, idx) => (
          <tr key={user.username + idx}>
            <td style={{ width: "2rem" }}>{idx + 1}</td>
            <td>{user.username}</td>
            <td>{user.points}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScoreTable;
