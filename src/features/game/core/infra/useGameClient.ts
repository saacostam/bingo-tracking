import { useCallback, useMemo } from "react";
import type { IGameClient } from "@/features/game/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

export function useGameClient(): IGameClient {
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
				game,
			};
		},
		[],
	);

	const getGames: IGameClient["getGames"] = useCallback(async () => {
		await wait(500);
		return DATA.GAMES;
	}, []);

	return useMemo(
		() => ({
			getGameById,
			getGames,
		}),
		[getGameById, getGames],
	);
}
