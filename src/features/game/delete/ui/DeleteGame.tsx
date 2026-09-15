import { Button, Flex, SimpleGrid, Text } from "@mantine/core";
import { useCallback } from "react";
import { useDeleteGameMutation, useQueryGames } from "@/features/game/core/app";

export interface DeleteGameProps {
	id: string;
	onCancel: () => void;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

export function DeleteGame({
	id,
	onCancel,
	onError,
	onSettled,
	onSuccess,
}: DeleteGameProps) {
	const deleteGameMutation = useDeleteGameMutation();
	const queryGames = useQueryGames();

	const onConfirm = useCallback(() => {
		queryGames.setOptimisticData((games) => {
			if (games === undefined) return games;

			return games.filter((game) => game.id !== id);
		});

		deleteGameMutation.mutate(
			{
				gameId: id,
			},
			{
				onError,
				onSettled,
				onSuccess,
			},
		);
	}, [
		deleteGameMutation.mutate,
		id,
		onError,
		onSettled,
		onSuccess,
		queryGames.setOptimisticData,
	]);

	return (
		<Flex direction="column" gap="lg">
			<Text>Are you sure you want to delete this game?</Text>
			<SimpleGrid cols={{ span: 1, xs: 2 }}>
				<Button onClick={onCancel} variant="outline">
					Cancel
				</Button>
				<Button loading={deleteGameMutation.isPending} onClick={onConfirm}>
					Delete
				</Button>
			</SimpleGrid>
		</Flex>
	);
}
