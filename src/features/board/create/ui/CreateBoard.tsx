import { useCallback } from "react";
import type { IBoardClientPayload } from "@/features/board/core/domain";
import { useQueryGameById } from "@/features/game/core/app";
import { useQueryUserCapabilities } from "@/features/user/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { CreateBoardContent } from "./CreateBoardContent";
import { CreateBoardSkeleton } from "./CreateBoardSkeleton";

export interface CreateBoardProps {
	gameId: string;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: (res: IBoardClientPayload["create"]["res"]) => void;
}

export function CreateBoard({
	gameId,
	onError,
	onSettled,
	onSuccess,
}: CreateBoardProps) {
	const queryGameById = useQueryGameById({ id: gameId }).useQuery();

	const queryUserCapabilities = useQueryUserCapabilities().useQuery();

	const retryQueries = useCallback(() => {
		queryGameById.refetch();
		queryUserCapabilities.refetch();
	}, [queryGameById.refetch, queryUserCapabilities.refetch]);

	const retry = useRetry(
		retryQueries,
		queryGameById.isPending || queryUserCapabilities.isPending,
	);

	const canUseImageFlow = queryUserCapabilities.isSuccess
		? queryUserCapabilities.data.vision
		: false;

	return (
		<>
			{queryGameById.isError ? (
				<QueryError
					error={queryGameById.error}
					msg="Unable to fetch game info"
					retry={retry}
					where="CreateBoard.queryGameById.isError"
				/>
			) : queryGameById.isSuccess ? (
				<CreateBoardContent
					boardTemplate={queryGameById.data.game.boardTemplate}
					canUseImageFlow={canUseImageFlow}
					gameId={gameId}
					onError={onError}
					onSettled={onSettled}
					onSuccess={onSuccess}
				/>
			) : (
				<CreateBoardSkeleton />
			)}
		</>
	);
}
