import { useAppSelector } from "@/shared/hooks";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

const Words = () => {
  const found = useAppSelector((state) => state.progress.found);
  const words = useAppSelector((state) => state.game.words);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          Palabras encontradas (
          {words ? `${found.length}/${words.length}` : "0/0"})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-grid"
          style={{ gridTemplate: "auto auto / repeat(2, 1fr)" }}
        >
          {found.map((word, idx) => (
            <div key={word}>
              <OverlayTrigger
                trigger="hover"
                placement="right"
                overlay={
                  <Tooltip id={`${word}-${idx}`}>
                    Buscar definicion en el diccionario.
                  </Tooltip>
                }
              >
                <a
                  className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  href={`https://dle.rae.es/${word}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {word}
                </a>
              </OverlayTrigger>
            </div>
          ))}
        </div>
      </Modal.Body>
    </>
  );
};

export default Words;
