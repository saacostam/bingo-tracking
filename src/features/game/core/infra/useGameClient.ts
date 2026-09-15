import { useCallback, useMemo } from "react";
import type { IGameClient } from "@/features/game/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

export function useGameClient(): IGameClient {
	const deleteGame: IGameClient["deleteGame"] = useCallback(
		async ({ gameId }) => {
			await wait(500);
			const game = DATA.GAMES.find((g) => g.id === gameId);

			if (!game)
				throw new DomainError({
					type: DomainErrorType.NOT_FOUND,
					userMsg: "Game not found",
					msg: "Game not found",
				});

			DATA.GAMES = DATA.GAMES.filter((game) => game.id !== gameId);
		},
		[],
	);

	const getGameById: IGameClient["getGameById"] = useCallback(
		async ({ id }) => {
			await wait(500);
			const game = DATA.GAMES.find((g) => g.id === id);

			if (!game)
				throw new DomainError({
					type: DomainErrorType.NOT_FOUND,
					userMsg: "Game not found",
					msg: "Game not found",
				});

			return {
				game: structuredClone(game),
			};
		},
		[],
	);

	const getGames: IGameClient["getGames"] = useCallback(async () => {
		await wait(500);
		return DATA.GAMES.map((game) => structuredClone(game));
	}, []);

	const setBoardTemplate: IGameClient["setBoardTemplate"] = useCallback(
		async ({ gameId, boardRange, boardTemplate }) => {
			await wait(500);

			for (const game of DATA.GAMES) {
				if (game.id !== gameId) continue;

				game.boardRange = boardRange;
				game.boardTemplate = {
					...game.boardTemplate,
					...boardTemplate,
				};
			}
		},
		[],
	);

	return useMemo(
		() => ({
			deleteGame,
			getGameById,
			getGames,
			setBoardTemplate,
		}),
		[deleteGame, getGameById, getGames, setBoardTemplate],
	);
}
