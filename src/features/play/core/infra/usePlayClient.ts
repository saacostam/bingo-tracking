import { useMemo } from "react";
import { v4 } from "uuid";
import type { IPlayClient } from "@/features/play/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";

export const createPlayClientFactory = (): IPlayClient => ({
	create: async ({ gameId, name }) => {
		DATA.GAMES = DATA.GAMES.map((g) =>
			g.id === gameId
				? {
						...g,
						plays: [
							...g.plays,
							{
								id: v4(),
								name,
								startedAt: Date.now(),
								takenNumbers: [],
							},
						],
					}
				: g,
		);
	},
	getByGameId: async ({ gameId }) => {
		const game = DATA.GAMES.find((g) => g.id === gameId);

		if (!game)
			throw new DomainError({
				type: DomainErrorType.NOT_FOUND,
				msg: "Game not found",
				userMsg: "Game not found",
			});

		return {
			plays: game.plays,
		};
	},
});

export function usePlayClient(): IPlayClient {
	return useMemo(() => createPlayClientFactory(), []);
}
