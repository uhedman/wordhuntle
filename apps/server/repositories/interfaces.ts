export interface UserDTO {
	id: string;
	username: string;
	passwordHash: string;
	createdAt: Date;
}

export interface ScoreDTO {
	id?: string;
	userId: string;
	level: number;
	points: number;
	date: Date;
}

export interface LeaderboardEntry {
	username: string;
	points: number;
}

export interface WordDTO {
	id?: string;
	userId: string;
	word: string;
	date: Date;
}

export interface UserRepository {
	findByUsername(username: string): Promise<UserDTO | null>;
	findById(id: string): Promise<UserDTO | null>;
	create(username: string, passwordHash: string): Promise<UserDTO>;
	validatePassword(user: UserDTO, password: string): Promise<boolean>;
	hashPassword(password: string): Promise<string>;
}

export interface ScoreRepository {
	findByUserAndDate(userId: string, date: Date): Promise<ScoreDTO | null>;
	upsert(
		userId: string,
		date: Date,
		points: number,
		level: number,
	): Promise<void>;
	getDailyLeaderboard(): Promise<LeaderboardEntry[]>;
	getWeeklyLeaderboard(): Promise<LeaderboardEntry[]>;
	getAllTimeLeaderboard(): Promise<LeaderboardEntry[]>;
}

export interface WordRepository {
	findByUserAndDate(userId: string, date: Date): Promise<string[]>;
	insertMany(
		entries: { userId: string; word: string; date: Date }[],
	): Promise<void>;
}
