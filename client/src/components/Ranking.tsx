import { useEffect, useState } from "react";
import { Modal, Tab, Tabs, Table, Spinner } from "react-bootstrap";

type Period = "daily" | "weekly" | "allTime";

interface Score {
  username: string;
  points: number;
}

interface Scores {
  daily: Score[];
  weekly: Score[];
  alltime: Score[];
}

const ScoreTable = ({ list }: { list: Score[] }) => {
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

const Ranking = () => {
  const [activeTab, setActiveTab] = useState<Period>("daily");
  const [scores, setScores] = useState<Scores>({
    daily: [],
    weekly: [],
    alltime: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/score/leaderboard");
        const data = (await res.json()) as Scores;
        console.log("Scores:", data);
        setScores(data);
      } catch (err) {
        console.error("Error al obtener scores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Tabla de mejores jugadores</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k as Period)}
            className="mb-3"
          >
            <Tab eventKey="daily" title="Diario">
              <ScoreTable list={scores.daily} />
            </Tab>
            <Tab eventKey="weekly" title="Semanal">
              <ScoreTable list={scores.weekly} />
            </Tab>
            <Tab eventKey="alltime" title="Histórico">
              <ScoreTable list={scores.alltime} />
            </Tab>
          </Tabs>
        )}
      </Modal.Body>
    </>
  );
};

export default Ranking;
