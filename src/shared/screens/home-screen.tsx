import { Flex, Modal, Text } from "@mantine/core";
import { useCallback, useState } from "react";
import { DeleteGame } from "@/features/game/delete/ui";
import { Games } from "@/features/game/list/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

type ModalStatus =
	| {
			type: "browse";
	  }
	| {
			type: "delete";
			payload: {
				gameId: string;
			};
	  };

export default function HomeScreen() {
	const { lang, notificationAdapter } = useAdapters();

	const [modal, setModal] = useState<ModalStatus>({
		type: "browse",
	});

	const onClose = useCallback(() => setModal({ type: "browse" }), []);

	const deleteGameSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			msg: "Game deleted",
		});
	}, [notificationAdapter.notify]);
	const deleteGameError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			msg: "Unable to delete game",
		});
	}, [notificationAdapter.notify]);

	const onClickDeleteGameById = useCallback(
		(gameId: string) =>
			setModal({
				type: "delete",
				payload: {
					gameId,
				},
			}),
		[],
	);

	return (
		<Flex direction="column" gap="md">
			<Text size="xl" fw="bold" display="block">
				{lang.get(ILanguageAdapterKey.GAMES_HEADER)}
			</Text>
			<Games onClickDeleteGameById={onClickDeleteGameById} />
			<Modal
				opened={modal.type === "delete"}
				onClose={onClose}
				title="Delete Game"
			>
				{modal.type === "delete" && (
					<DeleteGame
						id={modal.payload.gameId}
						onCancel={onClose}
						onError={deleteGameError}
						onSuccess={deleteGameSuccess}
						onSettled={onClose}
					/>
				)}
			</Modal>
		</Flex>
	);
}
