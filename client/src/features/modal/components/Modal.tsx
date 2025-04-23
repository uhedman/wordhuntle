import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { closeModal } from "@/features/modal/slices/modalSlice";
import History from "@/features/history/components/History";
import Info from "@/features/modal/components/Info";
import Share from "@/features/share/components/Share";
import Words from "@/features/game/components/Words";
import Ranking from "@/features/ranking/components/Ranking";
import User from "@/features/auth/components/User";
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
