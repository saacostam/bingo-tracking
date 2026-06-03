import { Box } from "@mantine/core";
import { useCallback } from "react";
import { useMutationUpdateBoard } from "@/features/board/core/app";
import type { IBoard } from "@/features/board/core/domain";
import {
	type IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { ManageBoard } from "@/features/board/manage/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface UpdateBoardContentProps {
	board: IBoard;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

export function UpdateBoardContent({
	board,
	onError,
	onSettled,
	onSuccess,
}: UpdateBoardContentProps) {
	const { lang } = useAdapters();

	const updateBoardMutation = useMutationUpdateBoard();

	const form = useManageBoardForm({
		defaultValues: {
			name: board.name,
			grid: board.grid,
		},
	});

	const onSubmit = useCallback(
		(data: IManageBoardForm) => {
			updateBoardMutation.mutate(
				{
					boardId: board.id,
					board: {
						name: data.name,
						grid: data.grid,
					},
				},
				{
					onError,
					onSettled,
					onSuccess,
				},
			);
		},
		[board.id, updateBoardMutation.mutate, onError, onSettled, onSuccess],
	);

	return (
		<Box data-testid="update-board-content">
			<ManageBoard
				action={lang.get(ILanguageAdapterKey.UPDATE_BOARD_SUBMIT_FORM)}
				form={form}
				isPending={updateBoardMutation.isPending}
				onSubmit={onSubmit}
			/>
		</Box>
	);
}
