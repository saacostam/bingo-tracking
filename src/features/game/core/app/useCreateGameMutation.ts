import { useQueryClient } from "@tanstack/react-query";
import type { IGameClientPayload } from "@/features/game/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useCreateGameMutation() {
	const queryClient = useQueryClient();

	const { game } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.CREATE_GAME],
		mutationFn: (req: IGameClientPayload["createGame"]["req"]) =>
			game.createGame(req),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_GAMES],
			});
		},
	});
}
