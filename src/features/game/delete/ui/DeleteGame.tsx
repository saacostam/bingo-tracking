import { Button, Flex, SimpleGrid, Text } from "@mantine/core";
import { useCallback } from "react";
import { useDeleteGameMutation, useQueryGames } from "@/features/game/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

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
	const { lang } = useAdapters();

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
			<Text>
				{lang.get(ILanguageAdapterKey.DELETE_GAME_MODAL_CONFIRMATION)}
			</Text>
			<SimpleGrid cols={{ span: 1, xs: 2 }}>
				<Button onClick={onCancel} variant="outline">
					{lang.get(ILanguageAdapterKey.DELETE_GAME_CANCEL_BUTTON_LABEL)}
				</Button>
				<Button loading={deleteGameMutation.isPending} onClick={onConfirm}>
					{lang.get(ILanguageAdapterKey.DELETE_GAME_CONFIRM_BUTTON_LABEL)}
				</Button>
			</SimpleGrid>
		</Flex>
	);
}
