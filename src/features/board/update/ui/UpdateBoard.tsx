import { useQueryBoardById } from "@/features/board/core/app";
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

	const retry = useRetry(queryBoardById.refetch, queryBoardById.isPending);

	return (
		<>
			{queryBoardById.isError && (
				<QueryError
					error={queryBoardById.error}
					msg={lang.get(ILanguageAdapterKey.UPDATE_BOARD_QUERY_BOARD_ERROR_MSG)}
					retry={retry}
					where="UpdateBoard.queryBoardById.isError"
				/>
			)}
			{queryBoardById.isLoading && <UpdateBoardSkeleton />}
			{queryBoardById.isSuccess && (
				<UpdateBoardContent
					board={queryBoardById.data.board}
					onError={onError}
					onSettled={onSettled}
					onSuccess={onSuccess}
				/>
			)}
		</>
	);
}
