import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import app from "./app";

describe("Express App Endpoints", () => {
	let server: Server;
	let baseUrl: string;

	beforeAll(async () => {
		return new Promise<void>((resolve, reject) => {
			server = app.listen(0, () => {
				const addr = server.address();
				const port = typeof addr === "string" ? 0 : addr?.port;
				baseUrl = `http://localhost:${port}`;
				resolve();
			});
			server.on("error", reject);
		});
	});

	afterAll(async () => {
		return new Promise<void>((resolve, reject) => {
			server.close((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	});

	it("GET / responde con mensaje de estado 200", async () => {
		const res = await fetch(`${baseUrl}/`);

		expect(res.status).toBe(200);
		const text = await res.text();
		expect(text).toBe("Backend funcionando!");
	});

	it("GET /ruta-inexistente responde con 404", async () => {
		const res = await fetch(`${baseUrl}/ruta-inexistente`);

		expect(res.status).toBe(404);
	});
});
