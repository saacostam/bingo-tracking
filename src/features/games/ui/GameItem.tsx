import { Avatar, Box, Card, Flex, GridCol, Text, Title } from "@mantine/core";
import { useGameColor } from "@/features/games/app";
import type { IGame } from "@/features/games/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { PuzzlePieceIcon } from "@/shared/icons";

export interface GameItemProps {
	game: IGame;
}

export function GameItem({ game }: GameItemProps) {
	const { date } = useAdapters();

	const color = useGameColor(game.createdAt);

	return (
		<GridCol key={game.id} span={{ base: 12, sm: 6, md: 4 }}>
			<Card h="100%" withBorder>
				<Flex direction="row" gap="md">
					<Avatar color={color}>
						<PuzzlePieceIcon />
					</Avatar>
					<Box w="100%">
						<Title size="lg">{game.name}</Title>
						<Text c="dimmed" size="xs">
							{date.format({ type: "utc-ms", value: game.createdAt })}
						</Text>
					</Box>
				</Flex>
			</Card>
		</GridCol>
	);
}
