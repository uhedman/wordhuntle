import { useAppSelector } from "@/shared/hooks";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Share = () => {
  const [copied, setCopied] = useState(false);
  const found = useAppSelector((state) => state.progress.found);
  const points = useAppSelector((state) => state.progress.points);
  const level = useAppSelector((state) => state.progress.level);

  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const text1 = `wordhuntle - ${day} de ${month} de ${year}`;
  const text2 = `Nivel ${level}/8 — ${points} puntos — ${found.length} palabras`;

  const copy = async () => {
    await navigator.clipboard.writeText(`${text1}\n${text2}`);
    setCopied(true);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Comparte tus resultados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-1">
          <div id="share" className="dark rounded p-2">
            <p className="m-0">{text1}</p>
            <p className="m-0">{text2}</p>
          </div>
          <Button onClick={copy}>{copied ? "Copiado!" : "Copiar"}</Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Share;
