import type { IBoardTemplate } from "@/features/board/core/domain";
import type {
	IGame,
	IWithBoards,
	IWithBoardTemplate,
	IWithPlays,
} from "@/features/game/core/domain";

const now = Date.now();

const defaultBoardTemplate: IBoardTemplate = {
	grid: new Array(5)
		.fill(null)
		.map(() => new Array(5).fill(null).map(() => ({ type: "available" }))),
};

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
					grid: [
						[1, 2, 3, 4, 5],
						[1, 2, 3, 4, 5],
						[1, 2, 3, 4],
						[1, 2, 3, 4, 5],
						[1, 2, 3, 4, 5],
					],
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
				},
			],
			boardTemplate: defaultBoardTemplate,
		},
		{
			id: "2",
			name: "Bingo 2024-II",
			createdAt: now + 1,
			boards: [],
			plays: [],
			boardTemplate: defaultBoardTemplate,
		},
		{
			id: "3",
			name: "Bingo 2025-II",
			createdAt: now + 2,
			boards: [],
			plays: [],
			boardTemplate: defaultBoardTemplate,
		},
	],
};
