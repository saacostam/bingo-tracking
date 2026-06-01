import { Box, Flex, Skeleton } from "@mantine/core";

export function GameByIdSkeleton() {
	return (
		<Flex data-testid="game-by-id-skeleton" direction="column" gap="xl">
			<Box>
				<Skeleton h="24px" w="128px" />
				<Skeleton h="12px" mt="xs" w="32px" />
			</Box>
			<Skeleton h="256px" />
		</Flex>
	);
}
