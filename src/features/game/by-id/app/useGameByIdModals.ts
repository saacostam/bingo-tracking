import { useCallback, useMemo, useState } from "react";

export interface UseGameByIdModalsArgs {
	gameId: string;
}

/**
 * Manages the board-related modal state for the GameById view.
 *
 * This hook centralizes the view transitions between the default browsing
 * state and the create, update, and delete board flows. It exposes the
 * current modal state along with callbacks that can be passed to UI
 * components to trigger modal transitions.
 *
 * The hook does not render any UI or perform side effects; it is solely
 * responsible for coordinating modal visibility and payload data required
 * by each modal.
 */
export function useGameByIdModals({ gameId }: UseGameByIdModalsArgs) {
	const [modal, setModal] = useState<
		| { type: "idle" }
		| { type: "create-board"; payload: { gameId: string } }
		| { type: "delete-board"; payload: { id: string } }
		| { type: "update-board"; payload: { id: string } }
	>({
		type: "idle",
	});

	const onClose = useCallback(() => setModal({ type: "idle" }), []);

	const onCreateBoard = useCallback(
		() => setModal({ type: "create-board", payload: { gameId } }),
		[gameId],
	);

	const onDeleteBoard = useCallback(
		(boardId: string) =>
			setModal({ type: "delete-board", payload: { id: boardId } }),
		[],
	);

	const onUpdateBoard = useCallback(
		(boardId: string) =>
			setModal({ type: "update-board", payload: { id: boardId } }),
		[],
	);

	return useMemo(
		() => ({
			modal,
			onClose,
			onCreateBoard,
			onDeleteBoard,
			onUpdateBoard,
		}),
		[modal, onClose, onCreateBoard, onDeleteBoard, onUpdateBoard],
	);
}
