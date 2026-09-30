import { useCallback, useMemo } from "react";
import { z } from "zod";
import type { IPlayClient } from "@/features/play/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";

const patternValidator = z.object({
	id: z.string(),
	body: z.array(z.array(z.boolean())),
});

const playValidator = z.object({
	id: z.string(),
	name: z.string(),
	startedAt: z.number(),
	takenNumbers: z.array(z.number()),
	gameId: z.string(),
	patterns: z.array(patternValidator),
});

const createResponseValidator = z.object({
	id: z.string(),
});

const getAllByGameIdResponseValidator = z.object({
	plays: z.array(playValidator),
});

const getByIdResponseValidator = z.object({
	play: playValidator,
});

export function usePlayClient(): IPlayClient {
	const { fetcherAdapter } = useAdapters();

	const create: IPlayClient["create"] = useCallback(
		async ({ gameId, name }) => {
			const response = await fetcherAdapter.post(`/play/${gameId}`, {
				name,
			});

			return createResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const deletePlay: IPlayClient["delete"] = useCallback(
		async ({ playId }) => {
			await fetcherAdapter.delete(`/play/${playId}`);
		},
		[fetcherAdapter.delete],
	);

	const getAllByGameId: IPlayClient["getAllByGameId"] = useCallback(
		async ({ gameId }) => {
			const response = await fetcherAdapter.get(`/play/game/${gameId}`);

			return getAllByGameIdResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const getById: IPlayClient["getById"] = useCallback(
		async ({ playId }) => {
			const response = await fetcherAdapter.get(`/play/${playId}`);

			return getByIdResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	const takeNumber: IPlayClient["takeNumber"] = useCallback(
		async ({ playId, takenNumbers }) => {
			await fetcherAdapter.patch(`/play/${playId}/taken-numbers`, {
				takenNumbers,
			});
		},
		[fetcherAdapter],
	);

	const updatePatterns: IPlayClient["updatePatterns"] = useCallback(
		async ({ playId, patterns }) => {
			await fetcherAdapter.patch(`/play/${playId}/patterns`, {
				patterns,
			});
		},
		[fetcherAdapter],
	);

	return useMemo(
		() => ({
			create,
			delete: deletePlay,
			getAllByGameId,
			getById,
			takeNumber,
			updatePatterns,
		}),
		[create, deletePlay, getAllByGameId, getById, takeNumber, updatePatterns],
	);
}
