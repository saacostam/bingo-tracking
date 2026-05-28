import { Grid, Paper } from "@mantine/core";
import type { IGame } from "@/features/games/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { EmptyQuery } from "@/shared/components";
import { GameItem } from "./GameItem";

export interface GamesContentProps {
	games: IGame[];
}

export function GamesContent({ games }: GamesContentProps) {
	const { lang } = useAdapters();

	return games.length === 0 ? (
		<Paper p="md" withBorder>
			<EmptyQuery
				description={lang.get(ILanguageAdapterKey.GAMES_NO_GAMES_DESCRIPTION)}
				title={lang.get(ILanguageAdapterKey.GAMES_NO_GAMES_TITLE)}
			/>
		</Paper>
	) : (
		<Grid gutter="md">
			{games.map((game) => (
				<GameItem key={game.id} game={game} />
			))}
		</Grid>
	);
}
