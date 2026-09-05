import { useQueryClient } from "@tanstack/react-query";
import type { IPlayClientPayload } from "@/features/play/core/domain";
import { MutationKeys, QueryKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useUpdatePatternsMutation() {
	const queryClient = useQueryClient();

	const { play } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.UPDATE_PATTERNS],
		mutationFn: (req: IPlayClientPayload["updatePatterns"]["req"]) =>
			play.updatePatterns(req),
		onSettled: (_, __, { playId }) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_PLAY_BY_ID, playId],
			});
		},
	});
}
