import { useEffect } from "react";

import { stopDrag } from "@/features/drag/thunks/stopDrag";
import { useAppDispatch } from "@/shared/hooks";

export const useStopDrag = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const handleEnd = () => {
			dispatch(stopDrag());
		};

		document.addEventListener("pointerup", handleEnd);
		document.addEventListener("touchend", handleEnd);

		return () => {
			document.removeEventListener("pointerup", handleEnd);
			document.removeEventListener("touchend", handleEnd);
		};
	}, [dispatch]);
};
