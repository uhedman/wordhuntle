import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeModal } from "@/store/slices/modalSlice";
import History from "@/components/History";
import Info from "@/components/Info";
import Share from "@/components/Share";
import Words from "@/components/Words";
import { useMemo } from "react";
import User from "./User";

const ModalComponent = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const content = useAppSelector((state) => state.modal.content);
  const dispatch = useAppDispatch();

  const options: Record<string, React.JSX.Element> = useMemo(
    () => ({
      "": <></>,
      share: <Share />,
      history: <History />,
      info: <Info />,
      words: <Words />,
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
