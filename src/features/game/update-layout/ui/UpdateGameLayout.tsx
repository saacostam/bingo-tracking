import { useQueryGameById } from "@/features/game/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { UpdateGameLayoutContent } from "./UpdateGameLayoutContent";
import { UpdateGameLayoutSkeleton } from "./UpdateGameLayoutSkeleton";

export interface UpdateGameLayoutProps {
	gameId: string;
	onClose: () => void;
}

export function UpdateGameLayout({ gameId, onClose }: UpdateGameLayoutProps) {
	const { lang } = useAdapters();

	const queryGame = useQueryGameById({
		id: gameId,
	}).useQuery();

	const retry = useRetry(queryGame.refetch, queryGame.isPending);

	return (
		<>
			{queryGame.isLoading && <UpdateGameLayoutSkeleton />}
			{queryGame.isError && (
				<QueryError
					msg={lang.get(
						ILanguageAdapterKey.UPDATE_GAME_LAYOUT_QUERY_BOARD_ERROR_MSG,
					)}
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
