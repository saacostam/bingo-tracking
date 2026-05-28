import { useCallback, useMemo } from "react";
import type { IGame, IGameClient } from "@/features/games/domain";
import { wait } from "@/shared/utils/time";

const now = Date.now();

const games: IGame[] = [
	{
		id: "1",
		name: "Bingo 2024-I",
		createdAt: now,
	},
	{
		id: "2",
		name: "Bingo 2024-II",
		createdAt: now + 1,
	},
	{
		id: "3",
		name: "Bingo 2025-II",
		createdAt: now + 2,
	},
];

export function useGameClient(): IGameClient {
	const getGames: IGameClient["getGames"] = useCallback(async () => {
		await wait(500);
		return games;
	}, []);

	return useMemo(
		() => ({
			getGames,
		}),
		[getGames],
	);
}
