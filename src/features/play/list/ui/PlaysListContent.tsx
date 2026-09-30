import { Box, Grid, Paper } from "@mantine/core";
import type { IPlay } from "@/features/play/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { EmptyQuery } from "@/shared/components";
import { PlaysListItem } from "./PlaysListItem";

export interface PlaysListContentProps {
	onDeletePlay: (id: string) => void;
	plays: IPlay[];
}

export function PlaysListContent({
	onDeletePlay,
	plays,
}: PlaysListContentProps) {
	const { lang } = useAdapters();

	return (
		<Box data-testid="plays-list-content">
			{plays.length === 0 ? (
				<Paper p="md" withBorder>
					<EmptyQuery
						description={lang.get(
							ILanguageAdapterKey.PLAYS_LIST_NO_PLAYS_DESCRIPTION,
						)}
						title={lang.get(ILanguageAdapterKey.PLAYS_LIST_NO_PLAYS_TITLE)}
					/>
				</Paper>
			) : (
				<Grid gutter="md">
					{plays.map((play) => (
						<PlaysListItem
							key={play.id}
							onDeletePlay={onDeletePlay}
							play={play}
						/>
					))}
				</Grid>
			)}
		</Box>
	);
}
