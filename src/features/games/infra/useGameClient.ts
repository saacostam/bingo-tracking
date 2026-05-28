import { useCallback, useMemo } from "react";
import type { IGame, IGameClient } from "@/features/games/domain";

const games: IGame[] = [];

export function useGameClient(): IGameClient {
	const getGames: IGameClient["getGames"] = useCallback(async () => {
		return games;
	}, []);

	return useMemo(
		() => ({
			getGames,
		}),
		[getGames],
	);
}
