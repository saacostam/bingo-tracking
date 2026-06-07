import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export interface UseQueryPlaysByGameIdArgs {
	gameId: string;
}

export function useQueryPlaysByGameId({ gameId }: UseQueryPlaysByGameIdArgs) {
	const { play } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_PLAYS_BY_GAME_ID, gameId],
		queryFn: () => play.getByGameId({ gameId }),
	});
}
