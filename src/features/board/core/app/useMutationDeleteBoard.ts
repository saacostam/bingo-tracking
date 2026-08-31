import { useQueryClient } from "@tanstack/react-query";
import type { IBoardClientPayload } from "@/features/board/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useMutationDeleteBoard() {
	const queryClient = useQueryClient();

	const { board } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.DELETE_BOARD],
		mutationFn: (req: IBoardClientPayload["delete"]["req"]) =>
			board.delete(req),
		onSettled: (_, __, { boardId }) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAME_BY_ID],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAMES],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_BOARD_BY_ID, boardId],
			});
		},
	});
}
