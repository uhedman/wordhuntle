import { describe, expect, it } from "vitest";

import reducer, {
	clearDisplay,
	displayFoundWord,
	displaySpecialMessage,
	displayWord,
} from "./slice";

describe("display slice", () => {
	const initialState = {
		text: "",
		className: "",
		showBubble: false,
	};

	it("should handle initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle displayWord", () => {
		const state = reducer(initialState, displayWord("GATO"));
		expect(state.text).toBe("GATO");
		expect(state.className).toBe("");
		expect(state.showBubble).toBe(false);
	});

	it("should handle displayFoundWord for various lengths", () => {
		const state4 = reducer(initialState, displayFoundWord(4));
		expect(state4.text).toBe("Bien +1");
		expect(state4.className).toBe("bg-success text-white showup");
		expect(state4.showBubble).toBe(true);

		const state5 = reducer(initialState, displayFoundWord(5));
		expect(state5.text).toBe("Genial +4");

		const state8 = reducer(initialState, displayFoundWord(8));
		expect(state8.text).toBe("Asombroso +10");

		const state10 = reducer(initialState, displayFoundWord(10));
		expect(state10.text).toBe("¡Exelente! +14");
	});

	it("should handle displaySpecialMessage", () => {
		const short = reducer(initialState, displaySpecialMessage("Muy corta"));
		expect(short.text).toBe("Muy corta");
		expect(short.className).toBe("bg-warning text-dark shake");
		expect(short.showBubble).toBe(true);

		const notFound = reducer(
			initialState,
			displaySpecialMessage("No existe"),
		);
		expect(notFound.className).toBe("bg-danger text-white shake");

		const duplicate = reducer(
			initialState,
			displaySpecialMessage("Ya encontrada"),
		);
		expect(duplicate.className).toBe("bg-info text-white shake");
	});

	it("should handle clearDisplay", () => {
		const populatedState = {
			text: "Mensaje",
			className: "algun-estilo",
			showBubble: true,
		};
		const state = reducer(populatedState, clearDisplay());
		expect(state.text).toBe("");
		expect(state.className).toBe("");
		expect(state.showBubble).toBe(false);
	});
});
