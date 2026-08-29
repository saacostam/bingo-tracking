import { Skeleton } from "@mantine/core";
import { useCallback } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import { useQueryPlayById } from "@/features/play/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { PlayNumbersContent } from "./PlayNumbersContent";

export interface PlayNumbersProps {
	playId: string;
}

export function PlayNumbers({ playId }: PlayNumbersProps) {
	const { useQuery, setOptimisticData } = useQueryPlayById({
		playId,
	});
	const queryPlayById = useQuery();

	const queryGameById = useQueryGameById({
		id: queryPlayById.isSuccess ? queryPlayById.data.play.gameId : "",
		enabled: queryPlayById.isSuccess, // WARN: Empty id is intentional; execution is gated by enabled
	}).useQuery();

	const retry = useRetry(
		useCallback(() => {
			queryPlayById.refetch();
			queryGameById.refetch();
		}, [queryPlayById.refetch, queryGameById.refetch]),
		queryPlayById.isPending || queryGameById.isPending,
	);

	const onClickTakenNumber = useCallback(
		(takenNumber: number) => {
			setOptimisticData((prev) => {
				if (prev === undefined) return undefined;

				const { takenNumbers } = prev.play;
				const isIncluded = takenNumbers.includes(takenNumber);

				const newTakenNumbers = isIncluded
					? takenNumbers.filter((n) => n !== takenNumber)
					: [...takenNumbers, takenNumber];

				return {
					...prev,
					play: {
						...prev.play,
						takenNumbers: newTakenNumbers,
					},
				};
			});
		},
		[setOptimisticData],
	);

	return (
		<>
			{(queryPlayById.isError || queryGameById.isError) && (
				<QueryError
					error={[queryPlayById.error, queryGameById.error]}
					msg="Unable to retrieve play numbers information"
					retry={retry}
					where="PlayNumbers.queryPlayById.isError"
				/>
			)}
			{queryPlayById.isSuccess && queryGameById.isSuccess && (
				<PlayNumbersContent
					boardRange={queryGameById.data.game.boardRange}
					takenNumbers={queryPlayById.data.play.takenNumbers}
					onClickTakenNumber={onClickTakenNumber}
				/>
			)}
			{(queryPlayById.isLoading || queryGameById.isLoading) && (
				<Skeleton data-testid="play-numbers-skeleton" h="128px" />
			)}
		</>
	);
}
