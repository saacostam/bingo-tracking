import { useCallback } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import { useQueryPlayById } from "@/features/play/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { PatternsListContent } from "./PatternsListContent";
import { PatternsListSkeleton } from "./PatternsListSkeleton";

export interface PatternsListProps {
	playId: string;
}

export function PatternsList({ playId }: PatternsListProps) {
	const queryPlay = useQueryPlayById({ playId }).useQuery();
	const queryGame = useQueryGameById({
		id: queryPlay.isSuccess ? queryPlay.data.play.gameId : "",
		enabled: queryPlay.isSuccess, // WARN: Empty id is intentional; execution is gated by enabled
	}).useQuery();

	const retry = useRetry(
		useCallback(() => {
			queryGame.refetch();
			queryPlay.refetch();
		}, [queryGame.refetch, queryPlay.refetch]),
		queryGame.isPending || queryPlay.isPending,
	);

	return (
		<>
			{(queryPlay.isLoading || queryGame.isLoading) && <PatternsListSkeleton />}
			{(queryPlay.isError || queryGame.isError) && (
				<QueryError
					msg="Unable to retrieve game information"
					retry={retry}
					error={[queryPlay.error, queryGame.error]}
					where="PatternsList.[any query].isError"
				/>
			)}
			{queryPlay.isSuccess && queryGame.isSuccess && (
				<PatternsListContent
					game={queryGame.data.game}
					play={queryPlay.data.play}
				/>
			)}
		</>
	);
}
