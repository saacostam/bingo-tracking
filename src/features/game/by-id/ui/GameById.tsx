import { Modal } from "@mantine/core";
import { useCallback, useState } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import type { IBoardSlots } from "./GameById.props";
import { GameByIdContent } from "./GameByIdContent";
import { GameByIdSkeleton } from "./GameByIdSkeleton";

export interface GameByIdProps {
	id: string;
	boardSlots: IBoardSlots;
}

export function GameById({ id, boardSlots }: GameByIdProps) {
	const [view, setView] = useState<
		| { type: "browse" }
		| { type: "create" }
		| { type: "delete"; payload: { id: string } }
		| { type: "update"; payload: { id: string } }
	>({
		type: "browse",
	});

	const onClose = useCallback(() => setView({ type: "browse" }), []);

	const onCreateBoard = useCallback(() => setView({ type: "create" }), []);

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
				/>
			)}
			{queryGameById.isPending && <GameByIdSkeleton />}

			{/* Modals */}
			<Modal opened={view.type === "create"} onClose={onClose} title="Create">
				<boardSlots.Create />
			</Modal>
			<Modal opened={view.type === "delete"} onClose={onClose} title="Delete">
				{view.type === "delete" && <boardSlots.Delete id={view.payload.id} />}
			</Modal>
			<Modal opened={view.type === "update"} onClose={onClose} title="Update">
				{view.type === "update" && <boardSlots.Update id={view.payload.id} />}
			</Modal>
		</>
	);
}
