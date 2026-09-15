import { Button, Flex, Modal, Text } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { IGameClientPayload } from "@/features/game/core/domain";
import { CreateGame } from "@/features/game/create";
import { DeleteGame } from "@/features/game/delete/ui";
import { Games } from "@/features/game/list/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { genRoute, RouteName } from "@/shared/router/app";

type ModalStatus =
	| {
			type: "browse";
	  }
	| {
			type: "create";
	  }
	| {
			type: "delete";
			payload: {
				gameId: string;
			};
	  };

export default function HomeScreen() {
	const nav = useNavigate();
	const { lang, notificationAdapter } = useAdapters();

	const [modal, setModal] = useState<ModalStatus>({
		type: "browse",
	});

	const onClose = useCallback(() => setModal({ type: "browse" }), []);

	const createGameSuccess = useCallback(
		({ gameId }: IGameClientPayload["createGame"]["res"]) => {
			notificationAdapter.notify({
				type: "success",
				msg: "Game created",
			});
			nav(genRoute({ name: RouteName.GAME_BY_ID, params: { id: gameId } }));
		},
		[nav, notificationAdapter.notify],
	);
	const createGameError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			msg: "Unable to create game",
		});
	}, [notificationAdapter.notify]);
	const onClickCreate = useCallback(() => setModal({ type: "create" }), []);

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
			<Flex direction="row" justify="space-between">
				<Text size="xl" fw="bold" display="block">
					{lang.get(ILanguageAdapterKey.GAMES_HEADER)}
				</Text>
				<Button onClick={onClickCreate}>Create</Button>
			</Flex>
			<Games onClickDeleteGameById={onClickDeleteGameById} />

			<Modal
				opened={modal.type === "create"}
				onClose={onClose}
				title="Create Game"
			>
				<CreateGame
					onError={createGameError}
					onSuccess={createGameSuccess}
					onSettled={onClose}
				/>
			</Modal>
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
