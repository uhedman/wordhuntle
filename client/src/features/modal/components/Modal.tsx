import User from "@/features/auth/components/User";
import Words from "@/features/game/components/Words";
import History from "@/features/history/components/History";
import Ranking from "@/features/ranking/components/Ranking";
import Share from "@/features/share/components/Share";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { closeModal } from "@/features/modal/slices/modalSlice";
import Info from "@/features/modal/components/Info";

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
