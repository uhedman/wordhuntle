export class CustomError extends Error {
	constructor(
		public message: string,
		public statusCode: number,
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class InvalidCredentialsError extends CustomError {
	constructor(message = "Credenciales inválidas") {
		super(message, 401);
	}
}

export class UserNotFoundError extends CustomError {
	constructor(message = "Usuario no encontrado") {
		super(message, 401);
	}
}

export class UserAlreadyExistsError extends CustomError {
	constructor(message = "Usuario ya existe") {
		super(message, 409);
	}
}

export class ValidationError extends CustomError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class InvalidTokenError extends CustomError {
	constructor(message = "Refresh token inválido") {
		super(message, 403);
	}
}
