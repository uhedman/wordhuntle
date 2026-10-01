import { mock } from "node:test";

import { UserRepository } from "../interfaces";

export const createMockUserRepo = (): UserRepository => ({
	findByUsername: mock.fn(async () => null),
	findById: mock.fn(async () => null),
	create: mock.fn(async () => ({
		id: "fake_id",
		username: "test",
		passwordHash: "hash",
		createdAt: new Date(),
	})),
	validatePassword: mock.fn(async () => false),
	hashPassword: mock.fn(async () => "hashed"),
});
