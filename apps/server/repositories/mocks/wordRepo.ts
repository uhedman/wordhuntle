import { mock } from "node:test";

import { WordRepository } from "../interfaces";

export const createMockWordRepo = (): WordRepository => ({
	findByUserAndDate: mock.fn(async () => []),
	insertMany: mock.fn(async () => undefined),
});
