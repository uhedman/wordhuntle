import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeModal } from "@/store/slices/modalSlice";
import History from "@/components/History";
import Info from "@/components/Info";
import Share from "@/components/Share";
import Words from "@/components/Words";
import Ranking from "@/components/Ranking";
import User from "@/components/User";
import { useMemo } from "react";

const ModalComponent = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const content = useAppSelector((state) => state.modal.content);
  const dispatch = useAppDispatch();

  const options: Record<string, React.JSX.Element> = useMemo(
    () => ({
      "": <></>,
      share: <Share />,
      history: <History />,
      words: <Words />,
      info: <Info />,
      ranking: <Ranking />,
      user: <User />,
    }),
    []
  );

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      {options[content]}
    </Modal>
  );
};

export default ModalComponent;
