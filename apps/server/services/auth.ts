import jwt from "jsonwebtoken";

import {
	ScoreRepository,
	UserRepository,
	WordRepository,
} from "../repositories/interfaces";
import { AuthBody } from "../types/auth";
import {
	InvalidCredentialsError,
	InvalidTokenError,
	UserAlreadyExistsError,
	UserNotFoundError,
	ValidationError,
} from "../utils/errors";
import { validateAuthInput } from "../validators/authValidator";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ""; // TODO
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ""; // TODO
const ACCESS_TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";

export type AuthService = ReturnType<typeof createAuthService>;

export const createAuthService = (
	userRepo: UserRepository,
	scoreRepo: ScoreRepository,
	wordRepo: WordRepository,
) => ({
	async login(username: string, password: string) {
		const user = await userRepo.findByUsername(username);
		if (!user || !(await userRepo.validatePassword(user, password))) {
			throw new InvalidCredentialsError();
		}

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const score = await scoreRepo.findByUserAndDate(user.id, today);
		const words = await wordRepo.findByUserAndDate(user.id, today);

		const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRATION,
		});

		const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
			expiresIn: REFRESH_TOKEN_EXPIRATION,
		});

		return {
			user: {
				username,
			},
			accessToken,
			refreshToken,
			message: "Login exitoso",
			progress: {
				found: words,
				level: score?.level,
				points: score?.points,
			},
		};
	},

	async me(userId?: string) {
		if (!userId) {
			throw new UserNotFoundError();
		}
		const user = await userRepo.findById(userId);
		if (!user) {
			throw new UserNotFoundError();
		}

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const score = await scoreRepo.findByUserAndDate(user.id, today);
		const words = await wordRepo.findByUserAndDate(user.id, today);

		return {
			message: "Usuario encontrado",
			user: { username: user.username },
			progress: {
				found: words,
				level: score?.level,
				points: score?.points,
			},
		};
	},

	async register(body: AuthBody) {
		const { username, password } = body;
		const validationError = validateAuthInput(username, password);

		if (validationError) {
			throw new ValidationError(validationError);
		}

		const existingUser = await userRepo.findByUsername(username);
		if (existingUser) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await userRepo.hashPassword(password);
		const newUser = await userRepo.create(username, passwordHash);

		const accessToken = jwt.sign({ id: newUser.id }, ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRATION,
		});

		const refreshToken = jwt.sign(
			{ id: newUser.id },
			REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TOKEN_EXPIRATION,
			},
		);

		return {
			message: "Usuario registrado con éxito",
			user: {
				username,
			},
			accessToken,
			refreshToken,
		};
	},

	refresh(token?: string) {
		if (!token) {
			throw new InvalidCredentialsError("Refresh token no encontrado");
		}

		try {
			const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
				id: string;
			};

			const newAccessToken = jwt.sign(
				{ id: payload.id },
				ACCESS_TOKEN_SECRET,
				{
					expiresIn: ACCESS_TOKEN_EXPIRATION,
				},
			);

			return {
				message: "Access token renovado",
				accessToken: newAccessToken,
			};
		} catch (err) {
			console.error("Error refrescando el token", err);
			throw new InvalidTokenError();
		}
	},
});
