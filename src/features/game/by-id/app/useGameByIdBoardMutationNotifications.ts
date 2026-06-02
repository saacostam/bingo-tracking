import { useCallback, useMemo } from "react";
import { useAdapters } from "@/shared/adapters/core/app";

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
	const { notificationAdapter } = useAdapters();

	// Create Board
	const createSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: "Created",
			msg: "Board was created",
		});
	}, [notificationAdapter.notify]);
	const createError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: "Error",
			msg: "Failed to create board",
		});
	}, [notificationAdapter.notify]);
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
			title: "Deleted",
			msg: "Board was deleted",
		});
	}, [notificationAdapter.notify]);
	const deleteError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: "Error",
			msg: "Failed to delete board",
		});
	}, [notificationAdapter.notify]);
	const remove = useMemo(
		() => ({
			onSuccess: deleteSuccess,
			onError: deleteError,
		}),
		[deleteSuccess, deleteError],
	);

	return useMemo(
		() => ({
			create,
			remove,
		}),
		[create, remove],
	);
}
