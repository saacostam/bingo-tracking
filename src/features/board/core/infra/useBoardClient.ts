import { useMemo } from "react";
import { v4 } from "uuid";
import type { IBoardClient } from "@/features/board/core/domain";
import { wait } from "@/shared/utils/time";

export const createBoardFactory = (): IBoardClient => ({
	create: async () => {
		wait(500);
		return { id: v4() };
	},
});

export function useBoardClient(): IBoardClient {
	return useMemo(() => createBoardFactory(), []);
}
