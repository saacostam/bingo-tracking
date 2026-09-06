import { useCallback } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import { useQueryPlayById } from "@/features/play/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { UpdatePatternsContent } from "./UpdatePatternsContent";
import { UpdatePatternsSkeleton } from "./UpdatePatternsSkeleton";

export interface UpdatePatternsProps {
	playId: string;
	onClose: () => void;
}

export function UpdatePatterns({ playId, onClose }: UpdatePatternsProps) {
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
			{(queryPlay.isLoading || queryGame.isLoading) && (
				<UpdatePatternsSkeleton />
			)}
			{(queryPlay.isError || queryGame.isError) && (
				<QueryError
					msg="Unable to retrieve game information"
					retry={retry}
					error={[queryPlay.error, queryGame.error]}
					where="UpdatePatterns.[any query].isError"
				/>
			)}
			{queryPlay.isSuccess && queryGame.isSuccess && (
				<UpdatePatternsContent
					game={queryGame.data.game}
					play={queryPlay.data.play}
					onClose={onClose}
				/>
			)}
		</>
	);
}
