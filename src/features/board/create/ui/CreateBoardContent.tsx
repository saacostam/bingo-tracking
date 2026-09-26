import { Box } from "@mantine/core";
import { useCallback } from "react";
import { useMutationCreateBoard } from "@/features/board/core/app";
import type { IBoardTemplate } from "@/features/board/core/domain";
import { BoardEditorFlow } from "@/features/board/editor-flow/ui";
import {
	type IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import type { CreateBoardProps } from "./CreateBoard";

export interface CreateBoardContentProps extends CreateBoardProps {
	boardTemplate: IBoardTemplate;
	canUseImageFlow: boolean;
}

export function CreateBoardContent({
	boardTemplate,
	canUseImageFlow,
	gameId,
	onError,
	onSettled,
	onSuccess,
}: CreateBoardContentProps) {
	const { lang } = useAdapters();

	const createBoardMutation = useMutationCreateBoard();

	const form = useManageBoardForm({
		defaultValues: {
			name: "",
			values: [],
		},
	});

	const onSubmit = useCallback(
		(data: IManageBoardForm) => {
			createBoardMutation.mutate(
				{
					gameId,
					name: data.name,
					values: data.values,
				},
				{
					onError,
					onSettled,
					onSuccess,
				},
			);
		},
		[createBoardMutation.mutate, gameId, onError, onSettled, onSuccess],
	);

	return (
		<Box data-testid="create-board-content">
			<BoardEditorFlow
				action={lang.get(ILanguageAdapterKey.CREATE_BOARD_SUBMIT_FORM)}
				boardTemplate={boardTemplate}
				canUseImageFlow={canUseImageFlow}
				form={form}
				isPending={createBoardMutation.isPending}
				onSubmit={onSubmit}
			/>
		</Box>
	);
}
