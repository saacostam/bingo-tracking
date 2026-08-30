import { useQueryClient } from "@tanstack/react-query";
import type { IPlayClientPayload } from "@/features/play/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useMutationCreatePlay() {
	const queryClient = useQueryClient();

	const { play } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.CREATE_PLAY],
		mutationFn: (req: IPlayClientPayload["create"]["req"]) => play.create(req),
		onSettled: (_, __, { gameId }) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_PLAYS_BY_GAME_ID, gameId],
			});
		},
	});
}
