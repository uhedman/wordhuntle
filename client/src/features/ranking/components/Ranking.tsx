import { useState, useEffect } from "react";
import { Modal, Spinner, Tabs, Tab } from "react-bootstrap";
import { Period, Ranking } from "@/features/ranking/types";
import ScoreTable from "@/features/ranking/components/ScoreTable";
import { getLeaderboard } from "@/shared/api";

const RankingComponent = () => {
  const [activeTab, setActiveTab] = useState<Period>("daily");
  const [scores, setScores] = useState<Ranking>({
    daily: [],
    weekly: [],
    alltime: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getLeaderboard();
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

export default RankingComponent;
