import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export interface UseQueryAllPlaysByGameIdArgs {
	gameId: string;
}

export function useQueryAllPlaysByGameId({
	gameId,
}: UseQueryAllPlaysByGameIdArgs) {
	const { play } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_PLAYS_BY_GAME_ID, gameId],
		queryFn: () => play.getAllByGameId({ gameId }),
	});
}
