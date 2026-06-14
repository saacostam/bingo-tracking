import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export interface UseQueryGameByIdArgs {
	id: string;
	enabled?: boolean;
}

export function useQueryGameById({ id, enabled }: UseQueryGameByIdArgs) {
	const { game } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_GAME_BY_ID, id],
		queryFn: () => game.getGameById({ id }),
		enabled,
	});
}
