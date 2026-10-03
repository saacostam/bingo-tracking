import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridCol,
	Group,
	Paper,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import type { ComponentType } from "react";
import { Board } from "@/features/board/core/ui";
import type {
	IGame,
	IWithBoards,
	IWithBoardTemplate,
} from "@/features/game/core/domain";
import type { PlaysListProps } from "@/features/play/list/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { EmptyQuery } from "@/shared/components";
import { PencilIcon, PlusIcon, TrashIcon } from "@/shared/icons";

export interface GameByIdContentProps {
	game: IWithBoardTemplate<IWithBoards<IGame>>;
	onCreateBoard: () => void;
	onCreatePlay: () => void;
	onDeleteBoard: (boardId: string) => void;
	onDeletePlay: (playId: string) => void;
	onSetGameBoardTemplate: () => void;
	onUpdateBoard: (boardId: string) => void;
	PlaysListSlot: ComponentType<PlaysListProps>;
}

export function GameByIdContent({
	game,
	onCreateBoard,
	onCreatePlay,
	onDeleteBoard,
	onDeletePlay,
	onSetGameBoardTemplate,
	onUpdateBoard,
	PlaysListSlot,
}: GameByIdContentProps) {
	const { date, lang } = useAdapters();

	return (
		<Flex data-testid="game-by-id-content" direction="column" gap="lg">
			<Box>
				<Title size="h2">{game.name}</Title>
				<Text c="dimmed" size="sm">
					{date.formatDateTime({ type: "utc-ms", value: game.createdAt })}
				</Text>
			</Box>
			<Divider />
			<PlaysListSlot
				gameId={game.id}
				onCreatePlay={onCreatePlay}
				onDeletePlay={onDeletePlay}
			/>
			<Divider />
			<Box>
				<Flex
					direction="row"
					justify="space-between"
					gap="md"
					mb="md"
					wrap="wrap"
				>
					<Box>
						<Title size="h3">
							{lang.get(ILanguageAdapterKey.GAME_BY_ID_BOARDS_HEADER)}
						</Title>
						<Text c="dimmed" size="sm">
							{lang.get(ILanguageAdapterKey.GAME_BY_ID_BOARDS_DESCRIPTION)}
						</Text>
					</Box>
					<Group gap="md" wrap="wrap">
						<Button
							leftSection={<PencilIcon height="1rem" width="1rem" />}
							onClick={onSetGameBoardTemplate}
							variant="outline"
						>
							{lang.get(
								ILanguageAdapterKey.GAME_BY_ID_UPDATE_LAYOUT_BUTTON_LABEL,
							)}
						</Button>
						<Button
							leftSection={<PlusIcon height="1rem" width="1rem" />}
							onClick={onCreateBoard}
						>
							{lang.get(
								ILanguageAdapterKey.GAME_BY_ID_CREATE_BOARD_BUTTON_LABEL,
							)}
						</Button>
					</Group>
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
									boardTemplate={game.boardTemplate}
									controls={
										<Flex direction="row" gap="xs" justify="end">
											<Tooltip
												label={lang.get(
													ILanguageAdapterKey.GAME_BY_ID_UPDATE_BOARD_BUTTON_TOOLTIP,
												)}
											>
												<ActionIcon
													onClick={() => onUpdateBoard(board.id)}
													variant="light"
												>
													<PencilIcon height="1rem" width="1rem" />
												</ActionIcon>
											</Tooltip>
											<Tooltip
												label={lang.get(
													ILanguageAdapterKey.GAME_BY_ID_DELETE_BOARD_BUTTON_TOOLTIP,
												)}
											>
												<ActionIcon
													color="red"
													onClick={() => onDeleteBoard(board.id)}
													variant="light"
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
