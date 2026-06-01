import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useQueryGames() {
	const { game } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_GAMES],
		queryFn: game.getGames,
	});
}
