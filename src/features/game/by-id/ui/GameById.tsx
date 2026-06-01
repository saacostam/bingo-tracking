import { useQueryGameById } from "@/features/game/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { GameByIdContent } from "./GameByIdContent";
import { GameByIdSkeleton } from "./GameByIdSkeleton";

export interface GameByIdProps {
	id: string;
}

export function GameById({ id }: GameByIdProps) {
	const { lang } = useAdapters();

	const queryGameById = useQueryGameById({
		id,
	}).useQuery();

	const retry = useRetry(queryGameById.refetch, queryGameById.isPending);

	if (queryGameById.isError)
		return (
			<QueryError
				error={queryGameById.error}
				where="GameById.queryGameById.isError"
				msg={lang.get(ILanguageAdapterKey.GAME_BY_ID_QUERY_GAME_ERROR_MSG)}
				retry={retry}
			/>
		);

	if (queryGameById.isSuccess)
		return <GameByIdContent game={queryGameById.data.game} />;

	return <GameByIdSkeleton />;
}
