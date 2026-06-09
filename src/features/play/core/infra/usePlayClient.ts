import { useMemo } from "react";
import { v4 } from "uuid";
import type { IPlayClient } from "@/features/play/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

export const createPlayClientFactory = (): IPlayClient => ({
	create: async ({ gameId, name }) => {
		await wait(200);

		const id = v4();

		DATA.GAMES = DATA.GAMES.map((g) =>
			g.id === gameId
				? {
						...g,
						plays: [
							...g.plays,
							{
								id,
								name,
								startedAt: Date.now(),
								takenNumbers: [],
							},
						],
					}
				: g,
		);

		return {
			id,
		};
	},
	getAllByGameId: async ({ gameId }) => {
		await wait(200);

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
