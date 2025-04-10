import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeModal } from "../redux/slices/modalSlice";
import History from "./History";
import Info from "./Info";
import Share from "./Share";
import Words from "./Words";

const ModalComponent = () => {
  const found = useAppSelector((state) => state.progress.found) || []; // TODO
  const words = useAppSelector((state) => state.gameData.words);
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const content = useAppSelector((state) => state.modal.content);
  const dispatch = useAppDispatch();

  const options: Record<
    string,
    { title: string; component: React.JSX.Element }
  > = {
    "": { title: "", component: <></> },
    share: { title: "Comparte tus resultados", component: <Share /> },
    history: { title: "Palabras de ayer", component: <History /> },
    info: { title: "Cómo jugar", component: <Info /> },
    words: {
      title: `Palabras encontradas (${words ? `${found.length}/${words.length}` : ""})`,
      component: <Words />,
    },
  };

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{options[content].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{options[content].component}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
