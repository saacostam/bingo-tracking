import type { ComponentType } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import type { PlaysListProps } from "@/features/play/list/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { GameByIdContent } from "./GameByIdContent";
import { GameByIdSkeleton } from "./GameByIdSkeleton";

export interface GameByIdProps {
	id: string;
	onCreateBoard: () => void;
	onCreatePlay: () => void;
	onDeleteBoard: (boardId: string) => void;
	onUpdateBoard: (boardId: string) => void;
	PlaysListSlot: ComponentType<PlaysListProps>;
}

export function GameById({
	id,
	onCreateBoard,
	onCreatePlay,
	onDeleteBoard,
	onUpdateBoard,
	PlaysListSlot,
}: GameByIdProps) {
	const { lang } = useAdapters();

	const queryGameById = useQueryGameById({
		id,
	}).useQuery();
	const retry = useRetry(queryGameById.refetch, queryGameById.isPending);

	return (
		<>
			{queryGameById.isError && (
				<QueryError
					error={queryGameById.error}
					where="GameById.queryGameById.isError"
					msg={lang.get(ILanguageAdapterKey.GAME_BY_ID_QUERY_GAME_ERROR_MSG)}
					retry={retry}
				/>
			)}
			{queryGameById.isSuccess && (
				<GameByIdContent
					game={queryGameById.data.game}
					onCreateBoard={onCreateBoard}
					onCreatePlay={onCreatePlay}
					onDeleteBoard={onDeleteBoard}
					onUpdateBoard={onUpdateBoard}
					PlaysListSlot={PlaysListSlot}
				/>
			)}
			{queryGameById.isLoading && <GameByIdSkeleton />}
		</>
	);
}
