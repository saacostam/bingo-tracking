import {
	ActionIcon,
	Avatar,
	Box,
	Card,
	Flex,
	Grid,
	Text,
	Title,
} from "@mantine/core";
import { type MouseEvent, useCallback } from "react";
import { Link } from "react-router";
import type { IPlay } from "@/features/play/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { PuzzlePieceIcon, TrashIcon } from "@/shared/icons";
import { genRoute, RouteName } from "@/shared/router/app";

export interface PlaysListItemProps {
	onDeletePlay: (id: string) => void;
	play: IPlay;
}

export function PlaysListItem({ onDeletePlay, play }: PlaysListItemProps) {
	const { date } = useAdapters();

	const onClickDelete = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			e.stopPropagation();

			onDeletePlay(play.id);
		},
		[onDeletePlay, play.id],
	);

	return (
		<Grid.Col
			key={play.id}
			data-testid="plays-list-content-item"
			span={{ base: 12, xs: 6, sm: 4 }}
		>
			<Card
				component={Link}
				h="100%"
				to={genRoute({
					name: RouteName.PLAY_BY_ID,
					params: {
						id: play.id,
					},
				})}
				withBorder
			>
				<Flex align="center" direction="row" gap="md" wrap="wrap">
					<Avatar color="indigo">
						<PuzzlePieceIcon />
					</Avatar>
					<Box style={{ flex: 1, minWidth: 0 }}>
						<Title size="lg">{play.name}</Title>
						<Text c="dimmed" size="xs">
							{date.formatDateTime({
								type: "utc-ms",
								value: play.startedAt,
							})}
						</Text>
					</Box>
					<ActionIcon color="red" onClick={onClickDelete} variant="light">
						<TrashIcon height="20" width="20" />
					</ActionIcon>
				</Flex>
			</Card>
		</Grid.Col>
	);
}
