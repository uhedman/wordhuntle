import { useState } from "react";
import { Modal, Spinner, Tabs, Tab } from "react-bootstrap";
import { Period } from "@/features/ranking/types";
import ScoreTable from "@/features/ranking/components/ScoreTable";
import { useScores } from "@/features/ranking/hooks/useScores";

const RankingComponent = () => {
  const [activeTab, setActiveTab] = useState<Period>("daily");
  const { scores, loading } = useScores();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Tabla de mejores jugadores</Modal.Title>
      </Modal.Header>

      <Modal.Body className="ranking-modal-body">
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
