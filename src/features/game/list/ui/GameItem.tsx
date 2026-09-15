import { Avatar, Box, Card, Flex, GridCol, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { useGameColor } from "@/features/game/core/app";
import type { IGame } from "@/features/game/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { RectangleGroup } from "@/shared/icons";
import { genRoute, RouteName } from "@/shared/router/app";

export interface GameItemProps {
	controls?: ReactNode;
	game: IGame;
}

export function GameItem({ controls, game }: GameItemProps) {
	const { date } = useAdapters();

	const color = useGameColor(game.createdAt);

	return (
		<GridCol
			key={game.id}
			data-testid="games-content-item"
			span={{ base: 12, sm: 6, md: 4 }}
		>
			<Card
				component={Link}
				h="100%"
				to={genRoute({
					name: RouteName.GAME_BY_ID,
					params: { id: game.id },
				})}
				withBorder
			>
				<Flex align="center" direction="row" gap="md" wrap="wrap">
					<Avatar color={color}>
						<RectangleGroup />
					</Avatar>
					<Box style={{ flex: 1, minWidth: 0 }}>
						<Title size="lg">{game.name}</Title>
						<Text c="dimmed" size="xs" truncate>
							{date.formatDate({ type: "utc-ms", value: game.createdAt })}
						</Text>
					</Box>
					{controls}
				</Flex>
			</Card>
		</GridCol>
	);
}
