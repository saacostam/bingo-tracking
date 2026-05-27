import { Flex, Text } from "@mantine/core";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export default function HomeScreen() {
	const { lang } = useAdapters();

	return (
		<Flex direction="column" gap="md">
			<Text size="xl" fw="bold" display="block">
				{lang.get(ILanguageAdapterKey.GAMES_HEADER)}
			</Text>
		</Flex>
	);
}
