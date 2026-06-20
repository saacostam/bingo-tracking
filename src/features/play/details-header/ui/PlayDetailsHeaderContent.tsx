import { Anchor, Box, Breadcrumbs, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import { useAdapters } from "@/shared/adapters/core/app";
import { genRoute, RouteName } from "@/shared/router/app";

export interface PlayDetailsHeaderContentProps {
	createdAt: number;
	gameId: string;
	name: string;
}

export function PlayDetailsHeaderContent({
	createdAt,
	gameId,
	name,
}: PlayDetailsHeaderContentProps) {
	const { date } = useAdapters();

	return (
		<Flex data-testid="play-details-header-content" direction="column" gap="lg">
			<Breadcrumbs>
				<Anchor component={Link} to={genRoute({ name: RouteName.HOME })}>
					Games
				</Anchor>
				<Anchor
					component={Link}
					to={genRoute({ name: RouteName.GAME_BY_ID, params: { id: gameId } })}
				>
					Game
				</Anchor>
				<Text c="var(--mantine-color-anchor)">Play</Text>
			</Breadcrumbs>
			<Box>
				<Title size="h2">{name}</Title>
				<Text c="dimmed" size="sm">
					{date.formatDateTime({
						type: "utc-ms",
						value: createdAt,
					})}
				</Text>
			</Box>
		</Flex>
	);
}
