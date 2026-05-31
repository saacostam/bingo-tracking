import { Anchor, Breadcrumbs, Flex, Text } from "@mantine/core";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { SuspenseLoader } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

export default function GameByIdScreen() {
	return <GameByIdScreenController GameById={() => null} />;
}

interface GameByIdScreenController {
	GameById: React.ComponentType<{
		id: string;
	}>;
}

export function GameByIdScreenController({
	GameById,
}: GameByIdScreenController) {
	const { id } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		if (!id) {
			nav(genRoute({ name: RouteName.HOME }));
		}
	}, [id, nav]);

	if (!id) return <SuspenseLoader />;

	return (
		<Flex direction="column" gap="xl">
			<Breadcrumbs>
				<Anchor component={Link} to={genRoute({ name: RouteName.HOME })}>
					Dashboard
				</Anchor>
				<Text c="var(--mantine-color-anchor)">Game</Text>
			</Breadcrumbs>
			<GameById id={id} />
		</Flex>
	);
}
