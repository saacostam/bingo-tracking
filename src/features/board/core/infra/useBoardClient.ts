import { useMemo } from "react";
import { v4 } from "uuid";
import type { IBoardClient } from "@/features/board/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

export const createBoardFactory = (): IBoardClient => ({
	create: async ({ gameId, name, grid }) => {
		await wait(200);
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
	delete: async ({ boardId }) => {
		await wait(200);

		DATA.GAMES = DATA.GAMES.map((g) => {
			const board = g.boards.find((b) => b.id === boardId);
			if (!board) return g;

			return {
				...g,
				boards: g.boards.filter((b) => b.id !== boardId),
			};
		});
	},
	getById: async ({ boardId }) => {
		for (const game of DATA.GAMES) {
			for (const board of game.boards) {
				if (board.id === boardId) {
					return {
						board,
					};
				}
			}
		}

		throw new DomainError({
			type: DomainErrorType.NOT_FOUND,
			msg: "Board not found",
			userMsg: "Board not found",
		});
	},
	update: async ({ boardId, board }) => {
		for (const game of DATA.GAMES) {
			for (let i = 0; i < game.boards.length; i++) {
				if (game.boards[i].id === boardId) {
					game.boards[i] = {
						...game.boards[i],
						...board,
					};

					return;
				}
			}
		}

		throw new DomainError({
			type: DomainErrorType.NOT_FOUND,
			msg: "Board not found",
			userMsg: "Board not found",
		});
	},
});

export function useBoardClient(): IBoardClient {
	return useMemo(() => createBoardFactory(), []);
}
