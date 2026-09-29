import { ActionIcon, Box, Flex, Grid, Paper } from "@mantine/core";
import { type MouseEvent, useCallback } from "react";
import type { IGame } from "@/features/game/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { EmptyQuery } from "@/shared/components";
import { TrashIcon } from "@/shared/icons";
import { GameItem } from "./GameItem";

export interface GamesContentProps {
	games: IGame[];
	onClickDeleteGameById: (gameId: string) => void;
}

export function GamesContent({
	games,
	onClickDeleteGameById: _onClickDeleteGameById,
}: GamesContentProps) {
	const { lang } = useAdapters();

	const onClickDeleteGameById = useCallback(
		(e: MouseEvent<HTMLButtonElement>, gameId: string) => {
			e.preventDefault();
			e.stopPropagation();

			_onClickDeleteGameById(gameId);
		},
		[_onClickDeleteGameById],
	);

	return (
		<Box data-testid="games-content">
			{games.length === 0 ? (
				<Paper p="md" withBorder>
					<EmptyQuery
						description={lang.get(
							ILanguageAdapterKey.GAMES_NO_GAMES_DESCRIPTION,
						)}
						title={lang.get(ILanguageAdapterKey.GAMES_NO_GAMES_TITLE)}
					/>
				</Paper>
			) : (
				<Grid gutter="md">
					{games.map((game) => (
						<GameItem
							key={game.id}
							game={game}
							controls={
								<Flex direction="row" justify="end" gap="md">
									<ActionIcon
										color="red"
										onClick={(e) => onClickDeleteGameById(e, game.id)}
										size="md"
										variant="light"
									>
										<TrashIcon height="20" width="20" />
									</ActionIcon>
								</Flex>
							}
						/>
					))}
				</Grid>
			)}
		</Box>
	);
}
