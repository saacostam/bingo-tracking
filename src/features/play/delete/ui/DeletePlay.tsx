import { Button, Flex, SimpleGrid, Text } from "@mantine/core";
import { useCallback } from "react";
import { useDeletePlayMutation } from "@/features/play/core/app";

export interface DeletePlayProps {
	id: string;
	onCancel: () => void;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

export function DeletePlay({
	id,
	onCancel,
	onError,
	onSettled,
	onSuccess,
}: DeletePlayProps) {
	const deletePlayMutation = useDeletePlayMutation();

	const onConfirm = useCallback(() => {
		deletePlayMutation.mutate(
			{
				playId: id,
			},
			{
				onError,
				onSettled,
				onSuccess,
			},
		);
	}, [deletePlayMutation.mutate, id, onError, onSettled, onSuccess]);

	return (
		<Flex direction="column" gap="lg">
			<Text>Are you sure you want to delete this play?</Text>
			<SimpleGrid cols={{ span: 1, xs: 2 }}>
				<Button onClick={onCancel} variant="outline">
					Cancel
				</Button>
				<Button loading={deletePlayMutation.isPending} onClick={onConfirm}>
					Delete
				</Button>
			</SimpleGrid>
		</Flex>
	);
}
