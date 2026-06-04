import { Flex, Loader, Paper, Text } from "@mantine/core";

export function ReadFromFileLoadingState() {
	return (
		<Paper p="xl" withBorder>
			<Flex direction="column" gap="md" align="center">
				<Loader size="md" />

				<Text size="md" fw="bold">
					Detecting board
				</Text>

				<Text size="sm" c="dimmed" ta="center">
					Analyzing image and extracting grid structure…
				</Text>
			</Flex>
		</Paper>
	);
}
