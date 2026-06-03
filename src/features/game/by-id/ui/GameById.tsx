import { Modal } from "@mantine/core";
import {
	useGameByIdBoardMutationNotifications,
	useGameByIdModals,
} from "@/features/game/by-id/app";
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
	const { lang } = useAdapters();

	const {
		modal: view,
		onClose,
		onCreateBoard,
		onDeleteBoard,
		onUpdateBoard,
	} = useGameByIdModals({
		gameId: id,
	});

	const { create, remove, update } = useGameByIdBoardMutationNotifications();

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
					onDeleteBoard={onDeleteBoard}
					onUpdateBoard={onUpdateBoard}
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
						onError={create.onError}
						onSuccess={create.onSuccess}
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
						onError={remove.onError}
						onSuccess={remove.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "update"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.UPDATE_BOARD_MODAL_TITLE)}
			>
				{view.type === "update" && (
					<boardSlots.Update
						id={view.payload.id}
						onError={update.onError}
						onSuccess={update.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
		</>
	);
}
