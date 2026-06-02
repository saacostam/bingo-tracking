import { Button, Flex, SimpleGrid, Text } from "@mantine/core";
import { useCallback } from "react";
import { useMutationDeleteBoard } from "@/features/board/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface DeleteBoardProps {
	id: string;
	onCancel: () => void;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

export function DeleteBoard({
	id,
	onCancel,
	onError,
	onSettled,
	onSuccess,
}: DeleteBoardProps) {
	const { lang } = useAdapters();

	const deleteBoardMutation = useMutationDeleteBoard();

	const onConfirm = useCallback(() => {
		deleteBoardMutation.mutate(
			{
				boardId: id,
			},
			{
				onError,
				onSettled,
				onSuccess,
			},
		);
	}, [deleteBoardMutation.mutate, id, onError, onSettled, onSuccess]);

	return (
		<Flex direction="column" gap="lg">
			<Text>
				{lang.get(ILanguageAdapterKey.DELETE_BOARD_MODAL_CONFIRMATION)}
			</Text>
			<SimpleGrid cols={{ span: 1, xs: 2 }}>
				<Button onClick={onCancel} variant="outline">
					{lang.get(ILanguageAdapterKey.DELETE_BOARD_CANCEL_BUTTON_LABEL)}
				</Button>
				<Button loading={deleteBoardMutation.isPending} onClick={onConfirm}>
					{lang.get(ILanguageAdapterKey.DELETE_BOARD_CONFIRM_BUTTON_LABEL)}
				</Button>
			</SimpleGrid>
		</Flex>
	);
}
