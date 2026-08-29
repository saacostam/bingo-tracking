import { useMemo } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import { useQueryPlayById } from "@/features/play/core/app";
import type { IRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { PlayBoardListContent } from "./PlayBoardListContent";
import { PlayBoardListSkeleton } from "./PlayBoardListSkeleton";

export interface PlayBoardListProps {
	playId: string;
}

export function PlayBoardList({ playId }: PlayBoardListProps) {
	const queryPlayById = useQueryPlayById({
		playId,
	}).useQuery();

	const queryGameById = useQueryGameById({
		id: queryPlayById.isSuccess ? queryPlayById.data.play.gameId : "",
		enabled: queryPlayById.isSuccess, // WARN: Empty id is intentional; execution is gated by enabled
	}).useQuery();

	const retry: IRetry = useMemo(
		() => ({
			isPending: queryPlayById.isPending || queryGameById.isPending,
			onClick: () => {
				queryPlayById.refetch();
				queryGameById.refetch();
			},
		}),
		[
			queryGameById.refetch,
			queryGameById.isPending,
			queryPlayById.refetch,
			queryPlayById.isPending,
		],
	);

	return (
		<>
			{queryPlayById.isError || queryGameById.isError ? (
				<QueryError
					error={[queryPlayById.error, queryGameById.error]}
					msg="Unable to retrieve play boards information"
					retry={retry}
					where="PlayBoardList.queries.isError"
				/>
			) : queryPlayById.isSuccess && queryGameById.isSuccess ? (
				<PlayBoardListContent
					boards={queryGameById.data.game.boards}
					boardTemplate={queryGameById.data.game.boardTemplate}
					takenNumbers={queryPlayById.data.play.takenNumbers}
				/>
			) : (
				<PlayBoardListSkeleton />
			)}
		</>
	);
}
