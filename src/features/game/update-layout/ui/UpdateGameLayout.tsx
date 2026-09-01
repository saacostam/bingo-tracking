import { useQueryGameById } from "@/features/game/core/app";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { UpdateGameLayoutContent } from "./UpdateGameLayoutContent";
import { UpdateGameLayoutSkeleton } from "./UpdateGameLayoutSkeleton";

export interface UpdateGameLayoutProps {
	gameId: string;
	onClose: () => void;
}

export function UpdateGameLayout({ gameId, onClose }: UpdateGameLayoutProps) {
	const queryGame = useQueryGameById({
		id: gameId,
	}).useQuery();

	const retry = useRetry(queryGame.refetch, queryGame.isPending);

	return (
		<>
			{queryGame.isLoading && <UpdateGameLayoutSkeleton />}
			{queryGame.isError && (
				<QueryError
					msg="Unable to retrieve game information"
					retry={retry}
					error={queryGame.error}
					where="SetBoardTemplate.queryGame.isError"
				/>
			)}
			{queryGame.isSuccess && (
				<UpdateGameLayoutContent game={queryGame.data.game} onClose={onClose} />
			)}
		</>
	);
}
