import { Modal } from "@mantine/core";
import { useCallback, useState } from "react";
import { useQueryGameById } from "@/features/game/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import type { GameByIdSlots } from "./GameById.props";
import { GameByIdContent } from "./GameByIdContent";
import { GameByIdSkeleton } from "./GameByIdSkeleton";

export interface GameByIdProps {
	id: string;

	CreateSlot: GameByIdSlots["Create"];
	DeleteSlot: GameByIdSlots["Delete"];
	UpdateSlot: GameByIdSlots["Update"];
}

export function GameById({
	id,
	CreateSlot,
	DeleteSlot,
	UpdateSlot,
}: GameByIdProps) {
	const [view, setView] = useState<
		| { type: "browse" }
		| { type: "create" }
		| { type: "delete"; payload: { id: string } }
		| { type: "update"; payload: { id: string } }
	>({
		type: "browse",
	});

	const onClose = useCallback(() => {
		setView({ type: "browse" });
	}, []);

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
				<GameByIdContent game={queryGameById.data.game} />
			)}
			{queryGameById.isPending && <GameByIdSkeleton />}

			{/* Modals */}
			<Modal opened={view.type === "create"} onClose={onClose} title="Create">
				<CreateSlot />
			</Modal>
			<Modal opened={view.type === "delete"} onClose={onClose} title="Delete">
				{view.type === "delete" && <DeleteSlot id={view.payload.id} />}
			</Modal>
			<Modal opened={view.type === "update"} onClose={onClose} title="Update">
				{view.type === "update" && <UpdateSlot id={view.payload.id} />}
			</Modal>
		</>
	);
}
