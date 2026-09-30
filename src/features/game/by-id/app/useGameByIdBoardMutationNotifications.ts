import { useCallback, useMemo } from "react";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

/**
 * Provides memoized notification handlers for board-related operations.
 *
 * This hook maps operation outcomes from feature-level actions to
 * application notifications, ensuring consistent user feedback while
 * centralizing notification logic.
 *
 * Handlers are stable and intended to be passed to async workflows
 * or UI event callbacks.
 */
export function useGameByIdBoardMutationNotifications() {
	const { lang, notificationAdapter } = useAdapters();

	// Create Board
	const createBoardSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_CREATED_TITLE),
			msg: lang.get(ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);
	const createBoardError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);
	const createBoard = useMemo(
		() => ({
			onSuccess: createBoardSuccess,
			onError: createBoardError,
		}),
		[createBoardSuccess, createBoardError],
	);

	// Create Play
	const createPlaySuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_CREATED_TITLE),
			msg: lang.get(ILanguageAdapterKey.CREATE_PLAY_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);
	const createPlayError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.CREATE_PLAY_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);
	const createPlay = useMemo(
		() => ({
			onSuccess: createPlaySuccess,
			onError: createPlayError,
		}),
		[createPlaySuccess, createPlayError],
	);

	// Delete Board
	const deleteBoardSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_DELETED_TITLE),
			msg: lang.get(ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);
	const deleteBoardError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);
	const deleteBoard = useMemo(
		() => ({
			onSuccess: deleteBoardSuccess,
			onError: deleteBoardError,
		}),
		[deleteBoardSuccess, deleteBoardError],
	);

	// Delete Play
	const deletePlaySuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_DELETED_TITLE),
			msg: "Play deleted successfully",
		});
	}, [lang.get, notificationAdapter.notify]);
	const deletePlayError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: "Unable to delete board",
		});
	}, [lang.get, notificationAdapter.notify]);
	const deletePlay = useMemo(
		() => ({
			onSuccess: deletePlaySuccess,
			onError: deletePlayError,
		}),
		[deletePlaySuccess, deletePlayError],
	);

	// Update Board
	const updateBoardSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_UPDATED_TITLE),
			msg: lang.get(ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);

	const updateBoardError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);

	const updateBoard = useMemo(
		() => ({
			onSuccess: updateBoardSuccess,
			onError: updateBoardError,
		}),
		[updateBoardSuccess, updateBoardError],
	);

	return useMemo(
		() => ({
			createBoard,
			createPlay,
			deleteBoard,
			deletePlay,
			updateBoard,
		}),
		[createBoard, createPlay, deleteBoard, deletePlay, updateBoard],
	);
}
