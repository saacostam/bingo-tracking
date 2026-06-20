import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export interface UseQueryPlayByIdArgs {
	playId: string;
}

export function useQueryPlayById({ playId }: UseQueryPlayByIdArgs) {
	const { play } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_PLAY_BY_ID, playId],
		queryFn: () => play.getById({ playId }),
	});
}
