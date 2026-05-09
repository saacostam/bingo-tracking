import { useCallback, useMemo } from "react";
import type { IBingoCard } from "./bingo.types";

/**
 * Abstraction over bingo related persistence
 */
export interface IBingoRepository {
    getAllBingoCards(): Promise<IBingoCard[]>;
}

export function useBingoRepository(): IBingoRepository {
    const getAllBingoCards: IBingoRepository["getAllBingoCards"] = useCallback(async () => {
        return [
            {
                id: "santiago-000084",
                board: [
                    [3, 1, 2, 12, 5],
                    [17, 16, 20, 22, 26],
                    [44, 42, 0, 34, 39],
                    [55, 48, 54, 58, 56],
                    [74, 75, 68, 61, 67],
                ]
            },
            {
                id: "santiago-000085",
                board: [
                    [5, 6, 3, 4, 8],
                    [27, 20, 24, 21, 16],
                    [37, 44, 0, 36, 40],
                    [49, 48, 52, 46, 50],
                    [73, 68, 63, 75, 67],
                ]
            }
        ]
    }, [])
    
    return useMemo(() => ({
        getAllBingoCards,
    }), [
        getAllBingoCards,
    ])
}
