import { useCallback, useMemo } from "react";
import { z } from "zod";
import type { IBoardClient } from "@/features/board/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";

const boardValidator = z.object({
	id: z.string(),
	name: z.string(),
	values: z.array(z.array(z.number().optional())),
	gameId: z.string(),
});

const createResponseValidator = z.object({
	id: z.string(),
});

const getByIdResponseValidator = z.object({
	board: boardValidator,
});

const readFromFileResponseValidator = z.object({
	values: z.array(z.array(z.number().optional())),
});

export function useBoardClient(): IBoardClient {
	const { fetcherAdapter } = useAdapters();

	const create: IBoardClient["create"] = useCallback(
		async ({ gameId, name, values }) => {
			const response = await fetcherAdapter.post(`/board/${gameId}`, {
				name,
				values,
			});

			return createResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const deleteBoard: IBoardClient["delete"] = useCallback(
		async ({ boardId }) => {
			await fetcherAdapter.delete(`/board/${boardId}`);
		},
		[fetcherAdapter],
	);

	const getById: IBoardClient["getById"] = useCallback(
		async ({ boardId }) => {
			const response = await fetcherAdapter.get(`/board/${boardId}`);

			return getByIdResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const readFromFile: IBoardClient["readFromFile"] = useCallback(
		async ({ boardTemplateId, file }) => {
			const formData = new FormData();
			formData.append("image", file);

			const response = await fetcherAdapter.post(
				`/board/read/template/${boardTemplateId}`,
				formData,
			);

			return readFromFileResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const update: IBoardClient["update"] = useCallback(
		async ({ boardId, board }) => {
			await fetcherAdapter.patch(`/board/${boardId}`, {
				name: board.name,
				values: board.values,
			});
		},
		[fetcherAdapter],
	);

	return useMemo(
		() => ({
			create,
			delete: deleteBoard,
			getById,
			readFromFile,
			update,
		}),
		[create, deleteBoard, getById, readFromFile, update],
	);
}
