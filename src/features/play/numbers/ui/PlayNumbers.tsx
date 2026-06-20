import { Skeleton } from "@mantine/core";
import { useQueryPlayById } from "@/features/play/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { PlayNumbersContent } from "./PlayNumbersContent";

export interface PlayNumbersProps {
	playId: string;
}

export function PlayNumbers({ playId }: PlayNumbersProps) {
	const queryPlayById = useQueryPlayById({
		playId,
	}).useQuery();
	const retry = useRetry(queryPlayById.refetch, queryPlayById.isPending);

	return (
		<>
			{queryPlayById.isError && (
				<QueryError
					error={queryPlayById.error}
					msg="Unable to retrieve play numbers information"
					retry={retry}
					where="PlayNumbers.queryPlayById.isError"
				/>
			)}
			{queryPlayById.isSuccess && (
				<PlayNumbersContent
					takenNumbers={queryPlayById.data.play.takenNumbers}
					totalNumbers={75}
				/>
			)}
			{queryPlayById.isLoading && (
				<Skeleton data-testid="play-numbers-skeleton" h="128px" />
			)}
		</>
	);
}
