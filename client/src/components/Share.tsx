import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { Button, Modal } from "react-bootstrap";

const Share = () => {
  const [copied, setCopied] = useState(false);
  const found = useAppSelector((state) => state.progress.found);
  const points = useAppSelector((state) => state.progress.points);
  const level = useAppSelector((state) => state.progress.level);

  const copy = async () => {
    const shareDiv = document.querySelector("#share");
    const text = shareDiv?.textContent; // TODO \n

    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Comparte tus resultados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-1">
          <div id="share" className="dark rounded p-2">
            <p className="m-0">
              wordhuntle - {day} de {month} de {year}
            </p>
            <p className="m-0">
              Nivel {level}/8 — {points} puntos — {found.length} palabras
            </p>
          </div>
          <Button onClick={copy}>{copied ? "Copiado!" : "Copiar"}</Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Share;
