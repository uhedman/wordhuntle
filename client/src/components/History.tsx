import { useAppSelector } from "@/hooks";
import { Modal } from "react-bootstrap";

const History = () => {
  const lastFound = useAppSelector((state) => state.history.lastFound);
  const lastWords = useAppSelector((state) => state.history.lastWords);
  const lastGrid = useAppSelector((state) => state.history.lastGrid);

  const words = lastWords === null ? Array(16).fill(null) : lastWords;

  const tiles = lastGrid === null ? Array(16).fill(null) : lastGrid.flat();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Palabras de ayer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-3">
          <p>Las palabras que encontraste están resaltadas</p>
          <div
            className="d-grid gap-2 w-75"
            style={{ gridTemplate: "auto auto / repeat(4, 1fr)" }}
          >
            {tiles.map((letter, index) =>
              letter === null ? (
                <div className="ratio ratio-1x1" key={index}>
                  {" "}
                  {/* TODO */}
                  <div className="placeholder-glow d-flex rounded border border-5 w-100 h-100">
                    <span className="placeholder d-flex flex-grow-1" />
                  </div>
                </div>
              ) : (
                <div className="ratio ratio-1x1" key={index}>
                  <div
                    className={
                      "d-flex align-items-center justify-content-center rounded border border-5"
                    }
                  >
                    {letter.toUpperCase()}
                  </div>
                </div>
              ),
            )}
          </div>
          <ul
            className="d-grid placeholder-glow"
            style={{ gridTemplate: "auto auto / repeat(2, 1fr)" }}
          >
            {words.map((word, index) =>
              word === null ? (
                <p key={index} className="placeholder w-50"></p>
              ) : lastFound.includes(word) ? (
                <p
                  key={index}
                  className="fw-bold"
                  style={{ color: "var(--green)" }}
                >
                  {word}
                </p>
              ) : (
                <p key={index}>{word}</p>
              ),
            )}
          </ul>
        </div>
      </Modal.Body>
    </>
  );
};

export default History;
