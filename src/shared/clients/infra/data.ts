import type { IBoardRange, IBoardTemplate } from "@/features/board/core/domain";
import type {
	IGame,
	IWithBoards,
	IWithBoardTemplate,
	IWithPlays,
} from "@/features/game/core/domain";
import type { IPattern } from "@/features/play/core/domain";

const now = Date.now();

const defaultBoardTemplate: IBoardTemplate = {
	grid: new Array(5)
		.fill(null)
		.map(() => new Array(5).fill(null).map(() => ({ type: "available" }))),
};
const defaultBoardRange: IBoardRange = {
	min: 1,
	max: 75,
};
const defaultPatterns: IPattern[] = Array.from({ length: 3 }, (_, index) => ({
	id: String(index + 1),
	body: [
		false,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
	],
}));

export const DATA: {
	GAMES: IWithBoardTemplate<IWithPlays<IWithBoards<IGame>>>[];
} = {
	GAMES: [
		{
			id: "1",
			name: "Bingo 2024-I",
			createdAt: now,
			boards: [
				{
					id: "1",
					name: "Board I",
					values: new Array(5 * 5)
						.fill(null)
						.map(() => Math.ceil(75 * Math.random())),
					gameId: "1",
				},
				{
					id: "2",
					name: "Board II",
					values: new Array(5 * 5)
						.fill(null)
						.map(() => Math.ceil(75 * Math.random())),
					gameId: "1",
				},
			],
			plays: [
				{
					id: "1",
					name: "Play 1",
					gameId: "1",
					startedAt: now + 200,
					takenNumbers: [],
					patterns: defaultPatterns,
				},
			],
			boardTemplate: defaultBoardTemplate,
			boardRange: defaultBoardRange,
		},
		{
			id: "2",
			name: "Bingo 2024-II",
			createdAt: now + 1,
			boards: [],
			plays: [],
			boardTemplate: defaultBoardTemplate,
			boardRange: defaultBoardRange,
		},
		{
			id: "3",
			name: "Bingo 2025-II",
			createdAt: now + 2,
			boards: [],
			plays: [],
			boardTemplate: defaultBoardTemplate,
			boardRange: defaultBoardRange,
		},
	],
};
