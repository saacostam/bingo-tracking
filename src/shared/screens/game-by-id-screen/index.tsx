import { Anchor, Breadcrumbs, Flex, Text } from "@mantine/core";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { GameById, type GameByIdSlots } from "@/features/game/by-id/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { SuspenseLoader } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

const gameByIdSlot: GameByIdSlots = {
	Create: () => null,
	Delete: () => null,
	Update: () => null,
};

export default function GameByIdScreen() {
	return (
		<GameByIdScreenController
			GameById={GameById}
			gameByIdSlots={gameByIdSlot}
		/>
	);
}

interface GameByIdScreenController {
	GameById: typeof GameById;
	gameByIdSlots: GameByIdSlots;
}

export function GameByIdScreenController({
	GameById,
	gameByIdSlots,
}: GameByIdScreenController) {
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
			<GameById
				key={id}
				id={id}
				CreateSlot={gameByIdSlots.Create}
				DeleteSlot={gameByIdSlots.Delete}
				UpdateSlot={gameByIdSlots.Update}
			/>
		</Flex>
	);
}
