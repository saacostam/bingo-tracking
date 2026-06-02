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
	const { lang, notificationAdapter } = useAdapters();

	const [view, setView] = useState<
		| { type: "browse" }
		| { type: "create"; payload: { gameId: string } }
		| { type: "delete"; payload: { id: string } }
		| { type: "update"; payload: { id: string } }
	>({
		type: "browse",
	});

	const onClose = useCallback(() => setView({ type: "browse" }), []);

	const onCreateBoard = useCallback(
		() => setView({ type: "create", payload: { gameId: id } }),
		[id],
	);
	const onDeleteBoard = useCallback(
		(boardId: string) => setView({ type: "delete", payload: { id: boardId } }),
		[],
	);

	const queryGameById = useQueryGameById({
		id,
	}).useQuery();

	const retry = useRetry(queryGameById.refetch, queryGameById.isPending);

	const onCreateBoardError = useCallback(
		() =>
			notificationAdapter.notify({
				type: "error",
				title: "Error",
				msg: "Failed to create board",
			}),
		[notificationAdapter.notify],
	);
	const onCreateBoardSuccess = useCallback(
		() =>
			notificationAdapter.notify({
				type: "success",
				title: "Created",
				msg: "Board was created",
			}),
		[notificationAdapter.notify],
	);

	const onDeleteBoardError = useCallback(
		() =>
			notificationAdapter.notify({
				type: "error",
				title: "Error",
				msg: "Failed to delete board",
			}),
		[notificationAdapter.notify],
	);
	const onDeleteBoardSuccess = useCallback(
		() =>
			notificationAdapter.notify({
				type: "success",
				title: "Deleted",
				msg: "Board was deleted",
			}),
		[notificationAdapter.notify],
	);

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
					onDeleteBoard={onDeleteBoard}
				/>
			)}
			{queryGameById.isPending && <GameByIdSkeleton />}

			{/* Modals */}
			<Modal
				opened={view.type === "create"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.CREATE_GAME_MODAL_TITLE)}
			>
				{view.type === "create" && (
					<boardSlots.Create
						gameId={view.payload.gameId}
						onError={onCreateBoardError}
						onSuccess={onCreateBoardSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "delete"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.DELETE_BOARD_MODAL_TITLE)}
			>
				{view.type === "delete" && (
					<boardSlots.Delete
						id={view.payload.id}
						onCancel={onClose}
						onError={onDeleteBoardError}
						onSuccess={onDeleteBoardSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal opened={view.type === "update"} onClose={onClose} title="Update">
				{view.type === "update" && <boardSlots.Update id={view.payload.id} />}
			</Modal>
		</>
	);
}
