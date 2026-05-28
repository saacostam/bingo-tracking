import { useCallback, useMemo } from "react";
import type { IGame, IGameClient } from "@/features/games/domain";
import { wait } from "@/shared/utils/time";

const games: IGame[] = [];

export function useGameClient(): IGameClient {
	const getGames: IGameClient["getGames"] = useCallback(async () => {
		wait(500);
		return games;
	}, []);

	return useMemo(
		() => ({
			getGames,
		}),
		[getGames],
	);
}
