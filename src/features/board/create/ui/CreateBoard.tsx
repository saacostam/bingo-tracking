import { useCallback } from "react";
import { useMutationCreateBoard } from "@/features/board/core/app";
import type { IBoardClientPayload } from "@/features/board/core/domain";
import { BoardEditorFlow } from "@/features/board/editor-flow/ui";
import {
	type IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface CreateBoardProps {
	gameId: string;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: (res: IBoardClientPayload["Create"]["Res"]) => void;
}

export function CreateBoard({
	gameId,
	onError,
	onSettled,
	onSuccess,
}: CreateBoardProps) {
	const { lang } = useAdapters();

	const createBoardMutation = useMutationCreateBoard();

	const form = useManageBoardForm({
		defaultValues: {
			name: "",
			grid: [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			],
		},
	});

	const onSubmit = useCallback(
		(data: IManageBoardForm) => {
			createBoardMutation.mutate(
				{
					gameId,
					name: data.name,
					grid: data.grid,
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
		<BoardEditorFlow
			action={lang.get(ILanguageAdapterKey.CREATE_BOARD_SUBMIT_FORM)}
			form={form}
			isPending={createBoardMutation.isPending}
			onSubmit={onSubmit}
		/>
	);
}
