import { useQueryClient } from "@tanstack/react-query";
import type { IPlayClientPayload } from "@/features/play/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useDeletePlayMutation() {
	const queryClient = useQueryClient();

	const { play } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.DELETE_PLAY],
		mutationFn: (req: IPlayClientPayload["delete"]["req"]) => play.delete(req),
		onSettled: (_, __, { playId }) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_PLAY_BY_ID, playId],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_PLAYS_BY_GAME_ID],
			});
		},
	});
}
