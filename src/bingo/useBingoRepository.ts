import { useCallback, useMemo } from "react";
import type { IBingoCard } from "./bingo.types";
import { IStorageAdapterKey, type IStorageAdapter } from "../storage";
import z from "zod";

const bingoCardCellSchema = z.object({
    id: z.string(),
    value: z.number(),
})

const bingoCardsSchema = z.object({
    id: z.string(),
    board: z.array(z.array(bingoCardCellSchema)),
})

/**
 * Abstraction over bingo related persistence
 */
export interface IBingoRepository {
    getAllBingoCards(): Promise<IBingoCard[]>;
}

export interface UseBingoRepositoryArgs {
    storage: IStorageAdapter;
}

export function useBingoRepository({
    storage,
}: UseBingoRepositoryArgs): IBingoRepository {
    const getAllBingoCards: IBingoRepository["getAllBingoCards"] = useCallback(async () => {
        const rawObject = storage.unsafeGet(IStorageAdapterKey.BINGO_CARDS);

        try {
            return z.array(bingoCardsSchema).parse(rawObject);
        } catch {
            return [];
        }
    }, [
        storage,
    ])
    
    return useMemo(() => ({
        getAllBingoCards,
    }), [
        getAllBingoCards,
    ])
}
