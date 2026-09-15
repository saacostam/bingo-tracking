import { useQueryClient } from "@tanstack/react-query";
import type { IGameClientPayload } from "@/features/game/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useDeleteGameMutation() {
	const queryClient = useQueryClient();

	const { game } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.DELETE_GAME],
		mutationFn: (req: IGameClientPayload["deleteGame"]["req"]) =>
			game.deleteGame(req),
		onSettled: (_, __, { gameId }) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAMES],
			});

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAME_BY_ID, gameId],
			});
		},
	});
}
