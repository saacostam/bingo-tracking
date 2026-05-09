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
    upsertBingoCard(args: {
        card: IBingoCard;
    }): Promise<void>;
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

    const upsertBingoCard: IBingoRepository["upsertBingoCard"] = useCallback(async ({
        card,
    }) => {
        const existingBingoCards = await getAllBingoCards();

        const isNew = existingBingoCards.find(existingCard => existingCard.id === card.id) === undefined;

        let bingoCards: IBingoCard[];
        if (isNew) {
            bingoCards = [...existingBingoCards, card];
        } else {
            bingoCards = existingBingoCards.map(c => c.id === card.id ? card : c)
        }

        storage.set(IStorageAdapterKey.BINGO_CARDS, bingoCards);
    }, [getAllBingoCards, storage])
    
    return useMemo(() => ({
        getAllBingoCards,
        upsertBingoCard,
    }), [
        getAllBingoCards,
        upsertBingoCard,
    ])
}
