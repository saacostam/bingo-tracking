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
	const createSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_CREATED_TITLE),
			msg: lang.get(ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);
	const createError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);
	const create = useMemo(
		() => ({
			onSuccess: createSuccess,
			onError: createError,
		}),
		[createSuccess, createError],
	);

	// Delete Board
	const deleteSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_DELETED_TITLE),
			msg: lang.get(ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);
	const deleteError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);
	const remove = useMemo(
		() => ({
			onSuccess: deleteSuccess,
			onError: deleteError,
		}),
		[deleteSuccess, deleteError],
	);

	// Update Board
	const updateSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_UPDATED_TITLE),
			msg: lang.get(ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_SUCCESS),
		});
	}, [lang.get, notificationAdapter.notify]);

	const updateError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: lang.get(ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE),
			msg: lang.get(ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_ERROR),
		});
	}, [lang.get, notificationAdapter.notify]);

	const update = useMemo(
		() => ({
			onSuccess: updateSuccess,
			onError: updateError,
		}),
		[updateSuccess, updateError],
	);

	return useMemo(
		() => ({
			create,
			remove,
			update,
		}),
		[create, remove, update],
	);
}
