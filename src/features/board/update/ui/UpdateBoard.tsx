import { useCallback } from "react";
import { useQueryBoardById } from "@/features/board/core/app";
import { useQueryGameById } from "@/features/game/core/app";
import { useQueryUserCapabilities } from "@/features/user/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { UpdateBoardContent } from "./UpdateBoardContent";
import { UpdateBoardSkeleton } from "./UpdateBoardSkeleton";

export interface UpdateBoardProps {
	id: string;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

export function UpdateBoard({
	id,
	onError,
	onSettled,
	onSuccess,
}: UpdateBoardProps) {
	const { lang } = useAdapters();

	const queryBoardById = useQueryBoardById({
		boardId: id,
	}).useQuery();

	const queryGameById = useQueryGameById({
		id: queryBoardById.isSuccess ? queryBoardById.data.board.gameId : "",
		enabled: queryBoardById.isSuccess, // WARN: Empty id is intentional; execution is gated by enabled
	}).useQuery();

	const queryUserCapabilities = useQueryUserCapabilities().useQuery();

	const retryQueries = useCallback(() => {
		queryBoardById.refetch();
		queryGameById.refetch();
		queryUserCapabilities.refetch();
	}, [
		queryBoardById.refetch,
		queryGameById.refetch,
		queryUserCapabilities.refetch,
	]);

	const retry = useRetry(
		retryQueries,
		queryBoardById.isPending ||
			queryGameById.isPending ||
			queryUserCapabilities.isPending,
	);

	const canUseImageFlow = queryUserCapabilities.isSuccess
		? queryUserCapabilities.data.vision
		: false;

	return (
		<>
			{queryBoardById.isError || queryGameById.isError ? (
				<QueryError
					error={queryBoardById.error}
					msg={lang.get(ILanguageAdapterKey.UPDATE_BOARD_QUERY_BOARD_ERROR_MSG)}
					retry={retry}
					where="UpdateBoard.queryBoardById.isError"
				/>
			) : queryBoardById.isSuccess && queryGameById.isSuccess ? (
				<UpdateBoardContent
					board={queryBoardById.data.board}
					boardTemplate={queryGameById.data.game.boardTemplate}
					canUseImageFlow={canUseImageFlow}
					onError={onError}
					onSettled={onSettled}
					onSuccess={onSuccess}
				/>
			) : (
				<UpdateBoardSkeleton />
			)}
		</>
	);
}
