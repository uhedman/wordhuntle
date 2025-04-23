import { Table } from "react-bootstrap";
import { UserScore } from "@/features/ranking/types";

const ScoreTable = ({ list }: { list: UserScore[] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Usuario</th>
          <th>Puntaje</th>
        </tr>
      </thead>
      <tbody>
        {list.map((user, idx) => (
          <tr key={user.username + idx}>
            <td>{idx + 1}</td>
            <td>{user.username}</td>
            <td>{user.points}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScoreTable;
