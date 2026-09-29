import bcrypt from "bcrypt";

import User from "../../models/User";
import { UserDTO, UserRepository } from "../interfaces";

export const mongooseUserRepo: UserRepository = {
	async findByUsername(username: string): Promise<UserDTO | null> {
		const user = await User.findOne({ username });
		if (!user) return null;
		return {
			id: user._id.toString(),
			username: user.username,
			passwordHash: user.passwordHash,
			createdAt: user.createdAt,
		};
	},

	async findById(id: string): Promise<UserDTO | null> {
		const user = await User.findById(id);
		if (!user) return null;
		return {
			id: user._id.toString(),
			username: user.username,
			passwordHash: user.passwordHash,
			createdAt: user.createdAt,
		};
	},

	async create(username: string, passwordHash: string): Promise<UserDTO> {
		const user = new User({ username, passwordHash });
		await user.save();
		return {
			id: user._id.toString(),
			username: user.username,
			passwordHash: user.passwordHash,
			createdAt: user.createdAt,
		};
	},

	async validatePassword(user: UserDTO, password: string): Promise<boolean> {
		return bcrypt.compare(password, user.passwordHash);
	},

	async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	},
};
