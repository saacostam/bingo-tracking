import { useCallback, useMemo } from "react";
import { v4 } from "uuid";
import type { IGameClient } from "@/features/game/core/domain";
import {
	DATA,
	defaultBoardRange,
	defaultBoardTemplate,
} from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

export function useGameClient(): IGameClient {
	const createGame: IGameClient["createGame"] = useCallback(
		async ({ name }) => {
			await wait(500);

			const gameId = v4();

			DATA.GAMES = [
				...DATA.GAMES,
				{
					id: gameId,
					name,
					createdAt: Date.now(),
					boards: [],
					plays: [],
					boardRange: defaultBoardRange,
					boardTemplate: defaultBoardTemplate(),
				},
			];

			return {
				gameId,
			};
		},
		[],
	);

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
			createGame,
			deleteGame,
			getGameById,
			getGames,
			setBoardTemplate,
		}),
		[createGame, deleteGame, getGameById, getGames, setBoardTemplate],
	);
}
