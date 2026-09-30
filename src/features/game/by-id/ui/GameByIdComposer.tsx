import { Modal } from "@mantine/core";
import {
	useGameByIdBoardMutationNotifications,
	useGameByIdModals,
} from "@/features/game/by-id/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import type {
	IBoardSlots,
	IGameSlots,
	IPlaySlots,
} from "./GameByIdComposer.props";

export interface GameByIdComposerProps {
	id: string;
	boardSlots: IBoardSlots;
	gameSlots: IGameSlots;
	playSlots: IPlaySlots;
}

export function GameByIdComposer({
	id,
	boardSlots,
	gameSlots,
	playSlots,
}: GameByIdComposerProps) {
	const { lang } = useAdapters();

	const {
		modal: view,
		onClose,
		onCreateBoard,
		onCreatePlay,
		onDeleteBoard,
		onDeletePlay,
		onSetGameBoardTemplate,
		onUpdateBoard,
	} = useGameByIdModals({
		gameId: id,
	});

	const { createBoard, createPlay, deleteBoard, deletePlay, updateBoard } =
		useGameByIdBoardMutationNotifications();

	return (
		<>
			<gameSlots.ById
				id={id}
				onCreateBoard={onCreateBoard}
				onCreatePlay={onCreatePlay}
				onDeleteBoard={onDeleteBoard}
				onDeletePlay={onDeletePlay}
				onSetGameBoardTemplate={onSetGameBoardTemplate}
				onUpdateBoard={onUpdateBoard}
				PlaysListSlot={playSlots.List}
			/>

			{/* Modals */}
			<Modal
				opened={view.type === "create-board"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.CREATE_BOARD_MODAL_TITLE)}
			>
				{view.type === "create-board" && (
					<boardSlots.Create
						gameId={view.payload.gameId}
						onError={createBoard.onError}
						onSuccess={createBoard.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "create-play"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.CREATE_PLAY_MODAL_TITLE)}
			>
				{view.type === "create-play" && (
					<playSlots.Create
						gameId={view.payload.gameId}
						onError={createPlay.onError}
						onSuccess={createPlay.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "delete-board"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.DELETE_BOARD_MODAL_TITLE)}
			>
				{view.type === "delete-board" && (
					<boardSlots.Delete
						id={view.payload.id}
						onCancel={onClose}
						onError={deleteBoard.onError}
						onSuccess={deleteBoard.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "delete-play"}
				onClose={onClose}
				title="Delete"
			>
				{view.type === "delete-play" && (
					<playSlots.Delete
						id={view.payload.playId}
						onCancel={onClose}
						onError={deletePlay.onError}
						onSuccess={deletePlay.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "update-board"}
				onClose={onClose}
				title={lang.get(ILanguageAdapterKey.UPDATE_BOARD_MODAL_TITLE)}
			>
				{view.type === "update-board" && (
					<boardSlots.Update
						id={view.payload.id}
						onError={updateBoard.onError}
						onSuccess={updateBoard.onSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
			<Modal
				opened={view.type === "update-game-layout"}
				onClose={onClose}
				title="Update Layout"
			>
				{view.type === "update-game-layout" && (
					<gameSlots.SetBoardTemplate
						gameId={view.payload.gameId}
						onClose={onClose}
					/>
				)}
			</Modal>
		</>
	);
}
