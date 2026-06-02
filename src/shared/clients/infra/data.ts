import type { IGame, IWithBoards } from "@/features/game/core/domain";

const now = Date.now();

export const DATA: {
	GAMES: IWithBoards<IGame>[];
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
				},
			],
		},
		{
			id: "2",
			name: "Bingo 2024-II",
			createdAt: now + 1,
			boards: [],
		},
		{
			id: "3",
			name: "Bingo 2025-II",
			createdAt: now + 2,
			boards: [],
		},
	],
};
