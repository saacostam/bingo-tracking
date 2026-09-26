import { Box } from "@mantine/core";
import { useCallback } from "react";
import { useMutationUpdateBoard } from "@/features/board/core/app";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { BoardEditorFlow } from "@/features/board/editor-flow/ui";
import {
	type IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface UpdateBoardContentProps {
	board: IBoard;
	boardTemplate: IBoardTemplate;
	canUseImageFlow: boolean;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

export function UpdateBoardContent({
	board,
	boardTemplate,
	canUseImageFlow,
	onError,
	onSettled,
	onSuccess,
}: UpdateBoardContentProps) {
	const { lang } = useAdapters();

	const updateBoardMutation = useMutationUpdateBoard();

	const form = useManageBoardForm({
		defaultValues: {
			name: board.name,
			values: board.values,
		},
	});

	const onSubmit = useCallback(
		(data: IManageBoardForm) => {
			updateBoardMutation.mutate(
				{
					boardId: board.id,
					board: {
						name: data.name,
						values: data.values,
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
			<BoardEditorFlow
				action={lang.get(ILanguageAdapterKey.UPDATE_BOARD_SUBMIT_FORM)}
				boardTemplate={boardTemplate}
				canUseImageFlow={canUseImageFlow}
				form={form}
				isPending={updateBoardMutation.isPending}
				onSubmit={onSubmit}
			/>
		</Box>
	);
}
