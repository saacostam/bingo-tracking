import { useMemo } from "react";
import { v4 } from "uuid";
import type { IBoardClient } from "@/features/board/core/domain";
import { DATA } from "@/shared/clients/infra";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { wait } from "@/shared/utils/time";

export const createBoardFactory = (): IBoardClient => ({
	create: async ({ gameId, name, values }) => {
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
								values,
								name,
								gameId,
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
			const hasBoard = g.boards.some((b) => b.id === boardId);
			if (!hasBoard) return g;

			return {
				...g,
				boards: g.boards.filter((b) => b.id !== boardId),
			};
		});
	},
	getById: async ({ boardId }) => {
		await wait(200);

		for (const g of DATA.GAMES) {
			const board = g.boards.find((b) => b.id === boardId);

			if (board) {
				return { board: structuredClone(board) };
			}
		}

		throw new DomainError({
			type: DomainErrorType.NOT_FOUND,
			msg: "Board not found",
			userMsg: "Board not found",
		});
	},
	readFromFile: async () => {
		await wait(1000);

		const randomCell = () => Math.floor(Math.random() * 100);

		return {
			values: new Array(25).fill(null).map(() => randomCell()),
		};
	},
	update: async ({ boardId, board }) => {
		await wait(200);

		let exists = false;

		DATA.GAMES = DATA.GAMES.map((g) => {
			const hasBoard = g.boards.some((b) => b.id === boardId);
			if (!hasBoard) return g;

			exists = true;

			return {
				...g,
				boards: g.boards.map((b) =>
					b.id === boardId ? { ...b, ...board } : b,
				),
			};
		});

		if (!exists) {
			throw new DomainError({
				type: DomainErrorType.NOT_FOUND,
				msg: "Board not found",
				userMsg: "Board not found",
			});
		}
	},
});

export function useBoardClient(): IBoardClient {
	return useMemo(() => createBoardFactory(), []);
}
