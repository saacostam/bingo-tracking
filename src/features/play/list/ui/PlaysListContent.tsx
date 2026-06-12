import { Box, Card, Grid, Paper, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import type { IPlay } from "@/features/play/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { EmptyQuery } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

export interface PlaysListContentProps {
	plays: IPlay[];
}

export function PlaysListContent({ plays }: PlaysListContentProps) {
	const { date, lang } = useAdapters();

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
						<Grid.Col
							key={play.id}
							data-testid="plays-list-content-item"
							span={{ base: 12, xs: 6, sm: 4 }}
						>
							<Card
								component={Link}
								h="100%"
								to={genRoute({
									name: RouteName.HOME,
								})}
								withBorder
							>
								<Title size="lg">{play.name}</Title>
								<Text c="dimmed" size="xs">
									{date.formatDateTime({
										type: "utc-ms",
										value: play.startedAt,
									})}
								</Text>
							</Card>
						</Grid.Col>
					))}
				</Grid>
			)}
		</Box>
	);
}
