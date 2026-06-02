import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridCol,
	Paper,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { Board } from "@/features/board/core/ui";
import type { IGame, IWithBoards } from "@/features/game/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { EmptyQuery } from "@/shared/components";
import { PlusIcon, TrashIcon } from "@/shared/icons";

export interface GameByIdContentProps {
	game: IWithBoards<IGame>;
	onCreateBoard: () => void;
	onDeleteBoard: (boardId: string) => void;
}

export function GameByIdContent({
	game,
	onCreateBoard,
	onDeleteBoard,
}: GameByIdContentProps) {
	const { date, lang } = useAdapters();

	return (
		<Flex data-testid="game-by-id-content" direction="column" gap="lg">
			<Box>
				<Title size="h2">{game.name}</Title>
				<Text c="dimmed" size="sm">
					{date.format({ type: "utc-ms", value: game.createdAt })}
				</Text>
			</Box>
			<Divider />
			<Box>
				<Flex direction="row" justify="space-between" mb="md">
					<Box>
						<Title size="h3">
							{lang.get(ILanguageAdapterKey.GAME_BY_ID_BOARDS_HEADER)}
						</Title>
						<Text c="dimmed" size="sm">
							{lang.get(ILanguageAdapterKey.GAME_BY_ID_BOARDS_DESCRIPTION)}
						</Text>
					</Box>
					<Button
						leftSection={<PlusIcon height="1rem" width="1rem" />}
						onClick={onCreateBoard}
					>
						{lang.get(ILanguageAdapterKey.GAME_BY_ID_CREATE_BUTTON_LABEL)}
					</Button>
				</Flex>
				{game.boards.length === 0 ? (
					<Paper p="md" withBorder>
						<EmptyQuery
							title={lang.get(ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_TITLE)}
							description={lang.get(
								ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_DESCRIPTION,
							)}
						/>
					</Paper>
				) : (
					<Grid gutter="md">
						{game.boards.map((board) => (
							<GridCol key={board.id} span={{ base: 12, xs: 6, md: 4 }}>
								<Board
									board={board}
									controls={
										<Flex direction="row" justify="end">
											<Tooltip
												label={lang.get(
													ILanguageAdapterKey.GAME_BY_ID_DELETE_BUTTON_TOOLTIP,
												)}
											>
												<ActionIcon
													color="red"
													onClick={() => onDeleteBoard(board.id)}
												>
													<TrashIcon height="1rem" width="1rem" />
												</ActionIcon>
											</Tooltip>
										</Flex>
									}
								/>
							</GridCol>
						))}
					</Grid>
				)}
			</Box>
		</Flex>
	);
}
