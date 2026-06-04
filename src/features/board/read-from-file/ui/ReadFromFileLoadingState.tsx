import { Flex, Loader, Paper, Text } from "@mantine/core";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export function ReadFromFileLoadingState() {
	const { lang } = useAdapters();

	return (
		<Paper p="xl" withBorder>
			<Flex direction="column" gap="md" align="center">
				<Loader size="md" />

				<Text size="md" fw="bold">
					{lang.get(ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_TITLE)}
				</Text>

				<Text size="sm" c="dimmed" ta="center">
					{lang.get(
						ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_DESCRIPTION,
					)}
				</Text>
			</Flex>
		</Paper>
	);
}
