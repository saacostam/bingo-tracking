import { useCallback, useMemo } from "react";
import type {
	IGame,
	IGameClient,
	IWithBoards,
} from "@/features/game/core/domain";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

const now = Date.now();

const games: IWithBoards<IGame>[] = [
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
];

export function useGameClient(): IGameClient {
	const getGameById: IGameClient["getGameById"] = useCallback(
		async ({ id }) => {
			await wait(500);
			const game = games.find((g) => g.id === id);

			if (!game)
				throw new DomainError({
					type: DomainErrorType.NOT_FOUND,
					userMsg: "Game not found",
					msg: "Game not found",
				});

			return {
				game,
			};
		},
		[],
	);

	const getGames: IGameClient["getGames"] = useCallback(async () => {
		await wait(500);
		return games;
	}, []);

	return useMemo(
		() => ({
			getGameById,
			getGames,
		}),
		[getGameById, getGames],
	);
}
