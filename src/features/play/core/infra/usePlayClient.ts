import { useMemo } from "react";
import type { IPlayClient } from "@/features/play/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";

export const createPlayClientFactory = (): IPlayClient => ({
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
