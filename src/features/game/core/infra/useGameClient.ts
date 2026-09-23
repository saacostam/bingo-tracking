import { useCallback, useMemo } from "react";
import { z } from "zod";
import type { IGameClient } from "@/features/game/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";

const boardValidator = z.object({
	id: z.string(),
	name: z.string(),
	values: z.array(z.array(z.number().optional())),
	gameId: z.string(),
});

const boardTemplateValidator = z.object({
	id: z.string(),
	grid: z.array(
		z.array(
			z.object({
				type: z.enum(["blocked", "available"]),
			}),
		),
	),
	boardRange: z.object({
		min: z.number(),
		max: z.number(),
	}),
});

const gameValidator = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.number(),
});

const gameListItemValidator = gameValidator.extend({
	boardTemplateId: z.string(),
});

const createGameResponseValidator = z.object({
	gameId: z.string(),
});

const getGamesResponseValidator = z.array(gameListItemValidator);

const getGameByIdResponseValidator = z.object({
	game: gameValidator.extend({
		boardTemplate: boardTemplateValidator,
		boards: z.array(boardValidator),
	}),
});

export function useGameClient(): IGameClient {
	const { fetcherAdapter } = useAdapters();

	const createGame: IGameClient["createGame"] = useCallback(
		async ({ name }) => {
			const response = await fetcherAdapter.post("/game", {
				name,
			});

			return createGameResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const deleteGame: IGameClient["deleteGame"] = useCallback(
		async ({ gameId }) => {
			await fetcherAdapter.delete(`/game/${gameId}`);
		},
		[fetcherAdapter],
	);

	const getGameById: IGameClient["getGameById"] = useCallback(
		async ({ id }) => {
			const response = await fetcherAdapter.get(`/game/${id}`);

			return getGameByIdResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const getGames: IGameClient["getGames"] = useCallback(async () => {
		const response = await fetcherAdapter.get("/game");

		return getGamesResponseValidator.parse(response);
	}, [fetcherAdapter]);

	const setBoardTemplate: IGameClient["setBoardTemplate"] = useCallback(
		async ({ gameId, boardTemplate }) => {
			await fetcherAdapter.patch(`/game/${gameId}/board-template`, {
				grid: boardTemplate.grid,
				boardRange: boardTemplate.boardRange,
			});
		},
		[fetcherAdapter],
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
