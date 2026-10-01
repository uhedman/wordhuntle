export const validateAuthInput = (
	username: unknown,
	password: unknown,
): string | null => {
	if (!username || !password) {
		return "Missing fields";
	}

	if (typeof username !== "string" || typeof password !== "string") {
		return "Invalid format";
	}

	if (username.length < 3 || username.length > 20) {
		return "Username length must be between 3 and 20 characters";
	}

	if (password.length < 8) {
		return "Password length must be at least 8 characters";
	}

	if (!/^[a-zA-Z0-9_\s]+$/.test(username)) {
		return "Username must contain only letters, numbers and underscores";
	}

	return null;
};
