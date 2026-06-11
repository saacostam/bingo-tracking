import { Anchor, Breadcrumbs, Flex, Text } from "@mantine/core";
import { type ComponentType, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { CreateBoard } from "@/features/board/create/ui";
import { DeleteBoard } from "@/features/board/delete/ui";
import { UpdateBoard } from "@/features/board/update/ui";
import {
	GameById,
	GameByIdComposer,
	type IBoardSlots,
	type IGameSlots,
	type IPlaySlots,
} from "@/features/game/by-id/ui";
import { CreatePlay } from "@/features/play/create/ui";
import { PlaysList } from "@/features/play/list/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { SuspenseLoader } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

const GameByIdWithBoardsSlots: GameByIdScreenControllerProps["GameById"] = (
	props,
) => {
	const boardSlots: IBoardSlots = useMemo(
		() => ({
			Create: CreateBoard,
			Delete: DeleteBoard,
			Update: UpdateBoard,
		}),
		[],
	);

	const gameSlots: IGameSlots = useMemo(
		() => ({
			ById: GameById,
		}),
		[],
	);

	const playSlots: IPlaySlots = useMemo(
		() => ({
			Create: CreatePlay,
			List: PlaysList,
		}),
		[],
	);

	return (
		<GameByIdComposer
			{...props}
			boardSlots={boardSlots}
			gameSlots={gameSlots}
			playSlots={playSlots}
		/>
	);
};

export default function GameByIdScreen() {
	return <GameByIdScreenController GameById={GameByIdWithBoardsSlots} />;
}

interface GameByIdScreenControllerProps {
	GameById: ComponentType<{ id: string }>;
}

export function GameByIdScreenController({
	GameById,
}: GameByIdScreenControllerProps) {
	const { lang } = useAdapters();

	const { id } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		if (!id) {
			nav(genRoute({ name: RouteName.HOME }));
		}
	}, [id, nav]);

	if (!id) return <SuspenseLoader />;

	return (
		<Flex direction="column" gap="lg">
			<Breadcrumbs>
				<Anchor component={Link} to={genRoute({ name: RouteName.HOME })}>
					{lang.get(ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_GAMES)}
				</Anchor>
				<Text c="var(--mantine-color-anchor)">
					{lang.get(ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_DETAILS)}
				</Text>
			</Breadcrumbs>
			<GameById key={id} id={id} />
		</Flex>
	);
}
