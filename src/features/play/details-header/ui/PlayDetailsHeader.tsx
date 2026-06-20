import { useQueryPlayById } from "@/features/play/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { PlayDetailsHeaderContent } from "./PlayDetailsHeaderContent";
import { PlayDetailsHeaderSkeleton } from "./PlayDetailsHeaderSkeleton";

export interface PlayDetailsHeaderProps {
	playId: string;
}

export function PlayDetailsHeader({ playId }: PlayDetailsHeaderProps) {
	const queryPlayById = useQueryPlayById({
		playId,
	}).useQuery();
	const retry = useRetry(queryPlayById.refetch, queryPlayById.isPending);

	return (
		<>
			{queryPlayById.isError && (
				<QueryError
					error={queryPlayById.error}
					msg="Unable to retrieve play information"
					retry={retry}
					where="PlayDetailsHeader.queryPlayById.isError"
				/>
			)}
			{queryPlayById.isSuccess && (
				<PlayDetailsHeaderContent
					createdAt={queryPlayById.data.play.startedAt}
					gameId={queryPlayById.data.play.gameId}
					name={queryPlayById.data.play.name}
				/>
			)}
			{queryPlayById.isLoading && <PlayDetailsHeaderSkeleton />}
		</>
	);
}
