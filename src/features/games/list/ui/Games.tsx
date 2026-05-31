import { useQueryGames } from "@/features/games/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { GamesContent } from "./GamesContent";
import { GamesSkeleton } from "./GamesSkeleton";

export function Games() {
	const { lang } = useAdapters();

	const queryGames = useQueryGames().useQuery();
	const retry = useRetry(queryGames.refetch, queryGames.isPending);

	return (
		<>
			{queryGames.isLoading && <GamesSkeleton />}
			{queryGames.isError && (
				<QueryError
					msg={lang.get(ILanguageAdapterKey.GAMES_QUERY_GAMES_ERROR_MSG)}
					retry={retry}
					error={queryGames.error}
					where="Games.queryGames.isError"
				/>
			)}
			{queryGames.isSuccess && <GamesContent games={queryGames.data} />}
		</>
	);
}
