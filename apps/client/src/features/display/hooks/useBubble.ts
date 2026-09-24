import { useEffect } from "react";

import { clearDisplay } from "@/features/display/slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";

export const useBubble = () => {
	const showBubble = useAppSelector((state) => state.display.showBubble);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (showBubble) {
			const timer = setTimeout(() => {
				dispatch(clearDisplay());
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [showBubble]);

	return { showBubble };
};
