import { useQueryClient } from "@tanstack/react-query";
import type { IGameClientPayload } from "@/features/game/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useSetBoardTemplateMutation() {
	const queryClient = useQueryClient();

	const c = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.SET_BOARD_TEMPLATE],
		mutationFn: (req: IGameClientPayload["setBoardTemplate"]["req"]) =>
			c.game.setBoardTemplate(req),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAMES],
			});

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAME_BY_ID],
			});

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_PLAYS_BY_GAME_ID],
			});
		},
	});
}
