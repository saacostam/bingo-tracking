import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export interface UseQueryGameByIdArgs {
	id: string;
}

export function useQueryGameById({ id }: UseQueryGameByIdArgs) {
	const { game } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_GAME_BY_ID],
		queryFn: () => game.getGameById({ id }),
	});
}
