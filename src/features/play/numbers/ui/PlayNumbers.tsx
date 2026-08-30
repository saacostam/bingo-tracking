import { useDebouncedCallback } from "@mantine/hooks";
import { useCallback } from "react";

import { useQueryGameById } from "@/features/game/core/app";
import {
	useMutationTakeNumber,
	useQueryPlayById,
} from "@/features/play/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";

import { PlayNumbersContent } from "./PlayNumbersContent";
import { PlayNumbersSkeleton } from "./PlayNumbersSkeleton";

export interface PlayNumbersProps {
	playId: string;
}

export function PlayNumbers({ playId }: PlayNumbersProps) {
	const { notificationAdapter } = useAdapters();

	const { useQuery: useQueryPlay, setOptimisticData } = useQueryPlayById({
		playId,
	});
	const queryPlayById = useQueryPlay();
	const queryGameById = useQueryGameById({
		id: queryPlayById.isSuccess ? queryPlayById.data.play.gameId : "",
		enabled: queryPlayById.isSuccess,
	}).useQuery();

	const retry = useRetry(
		useCallback(() => {
			queryPlayById.refetch();
			queryGameById.refetch();
		}, [queryPlayById.refetch, queryGameById.refetch]),
		queryPlayById.isPending || queryGameById.isPending,
	);

	const takeNumberMutation = useMutationTakeNumber();

	const debouncedTakeNumber = useDebouncedCallback((takenNumbers: number[]) => {
		void takeNumberMutation.fastMutate(
			{
				playId,
				takenNumbers,
			},
			{
				onError: () => {
					notificationAdapter.notify({
						type: "error",
						title: "Error",
						msg: "Unable to save numbers.",
					});
				},
			},
		);
	}, 700);

	const onClickTakenNumber = useCallback(
		(takenNumber: number) => {
			const play = queryPlayById.data?.play;

			if (play === undefined) return;

			const { takenNumbers } = play;
			const isIncluded = takenNumbers.includes(takenNumber);

			const newTakenNumbers = isIncluded
				? takenNumbers.filter((n) => n !== takenNumber)
				: [...takenNumbers, takenNumber];

			setOptimisticData((prev) => {
				if (prev === undefined) return undefined;

				return {
					...prev,
					play: {
						...prev.play,
						takenNumbers: newTakenNumbers,
					},
				};
			});

			debouncedTakeNumber(newTakenNumbers);
		},
		[debouncedTakeNumber, queryPlayById.data, setOptimisticData],
	);

	const isPending =
		queryPlayById.isPending ||
		queryGameById.isPending ||
		takeNumberMutation.isPending;

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
					isPending={isPending}
				/>
			)}

			{(queryPlayById.isLoading || queryGameById.isLoading) && (
				<PlayNumbersSkeleton />
			)}
		</>
	);
}
