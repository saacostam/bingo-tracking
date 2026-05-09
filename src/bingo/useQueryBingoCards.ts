import { useQuery } from "@tanstack/react-query";
import { useStorageAdapter } from "../storage";
import { useBingoRepository } from "./useBingoRepository";

export function useQueryBingoCards() {
    const storage = useStorageAdapter();

    const repo = useBingoRepository({
        storage,
    });

    return useQuery({
        queryKey: ["bingo-cards"],
        queryFn: () => repo.getAllBingoCards(),
    })
}
