import { useMemo } from "react";
import { Modal } from "react-bootstrap";

import User from "@/features/auth/components/User";
import Words from "@/features/game/components/Words";
import History from "@/features/history/components/History";
import Info from "@/features/modal/components/Info";
import { closeModal } from "@/features/modal/slice";
import Ranking from "@/features/ranking/components/Ranking";
import Share from "@/features/share/components/Share";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";

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
		[],
	);

	return (
		<Modal show={isOpen} onHide={() => dispatch(closeModal())}>
			{options[content]}
		</Modal>
	);
};

export default ModalComponent;
