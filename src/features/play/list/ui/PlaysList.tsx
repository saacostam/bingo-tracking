import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useQueryAllPlaysByGameId } from "@/features/play/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { PlusIcon } from "@/shared/icons";
import { PlaysListContent } from "./PlaysListContent";
import { PlaysListSkeleton } from "./PlaysListSkeleton";

export interface PlaysListProps {
	gameId: string;
	onCreatePlay: () => void;
	onDeletePlay: (id: string) => void;
}

export function PlaysList({
	gameId,
	onCreatePlay,
	onDeletePlay,
}: PlaysListProps) {
	const { lang } = useAdapters();

	const queryAllPlaysByGameId = useQueryAllPlaysByGameId({ gameId }).useQuery();
	const retry = useRetry(
		queryAllPlaysByGameId.refetch,
		queryAllPlaysByGameId.isPending,
	);

	return (
		<Flex direction="column" gap="lg">
			<Flex direction="row" justify="space-between" gap="md" wrap="wrap">
				<Box>
					<Title size="h3">
						{lang.get(ILanguageAdapterKey.PLAYS_LIST_HEADER)}
					</Title>
					<Text c="dimmed" size="sm">
						{lang.get(ILanguageAdapterKey.PLAYS_LIST_DESCRIPTION)}
					</Text>
				</Box>
				<Button
					leftSection={<PlusIcon height="1rem" width="1rem" />}
					onClick={onCreatePlay}
				>
					{lang.get(ILanguageAdapterKey.GAME_BY_ID_CREATE_PLAY_BUTTON_lABEL)}
				</Button>
			</Flex>

			<Box>
				{queryAllPlaysByGameId.isLoading && <PlaysListSkeleton />}
				{queryAllPlaysByGameId.isError && (
					<QueryError
						msg={lang.get(ILanguageAdapterKey.PLAYS_LIST_QUERY_PLAYS_ERROR_MSG)}
						retry={retry}
						error={queryAllPlaysByGameId.error}
						where="PlaysList.queryAllPlaysByGameId.isError"
					/>
				)}
				{queryAllPlaysByGameId.isSuccess && (
					<PlaysListContent
						onDeletePlay={onDeletePlay}
						plays={queryAllPlaysByGameId.data.plays}
					/>
				)}
			</Box>
		</Flex>
	);
}
