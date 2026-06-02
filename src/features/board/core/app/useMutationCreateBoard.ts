import { useQueryClient } from "@tanstack/react-query";
import type { IBoardClientPayload } from "@/features/board/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useMutationCreateBoard() {
	const queryClient = useQueryClient();

	const { board } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.CREATE_BOARD],
		mutationFn: (req: IBoardClientPayload["Create"]["Req"]) =>
			board.create(req),
		onSettled: (_, __, { gameId }) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAME_BY_ID, gameId],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAMES],
			});
		},
	});
}
