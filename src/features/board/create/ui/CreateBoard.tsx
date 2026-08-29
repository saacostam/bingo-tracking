import type { IBoardClientPayload } from "@/features/board/core/domain";
import { useQueryGameById } from "@/features/game/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { CreateBoardContent } from "./CreateBoardContent";
import { CreateBoardSkeleton } from "./CreateBoardSkeleton";

export interface CreateBoardProps {
	gameId: string;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: (res: IBoardClientPayload["Create"]["Res"]) => void;
}

export function CreateBoard({
	gameId,
	onError,
	onSettled,
	onSuccess,
}: CreateBoardProps) {
	const queryGameById = useQueryGameById({ id: gameId }).useQuery();
	const retry = useRetry(queryGameById.refetch, queryGameById.isPending);

	return (
		<>
			{queryGameById.isError && (
				<QueryError
					error={queryGameById.error}
					msg="Unable to fetch game info"
					retry={retry}
					where="CreateBoard.queryGameById.isError"
				/>
			)}
			{queryGameById.isLoading && <CreateBoardSkeleton />}
			{queryGameById.isSuccess && (
				<CreateBoardContent
					boardTemplate={queryGameById.data.game.boardTemplate}
					gameId={gameId}
					onError={onError}
					onSettled={onSettled}
					onSuccess={onSuccess}
				/>
			)}
		</>
	);
}
