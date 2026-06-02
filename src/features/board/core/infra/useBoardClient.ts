import { useMemo } from "react";
import { v4 } from "uuid";
import type { IBoardClient } from "@/features/board/core/domain";
import { DATA } from "@/shared/clients/infra";
import { wait } from "@/shared/utils/time";

export const createBoardFactory = (): IBoardClient => ({
	create: async ({ gameId, name, grid }) => {
		wait(500);
		const id = v4();

		DATA.GAMES = DATA.GAMES.map((g) =>
			g.id === gameId
				? {
						...g,
						boards: [
							...g.boards,
							{
								id,
								grid,
								name,
							},
						],
					}
				: g,
		);

		return { id };
	},
});

export function useBoardClient(): IBoardClient {
	return useMemo(() => createBoardFactory(), []);
}
