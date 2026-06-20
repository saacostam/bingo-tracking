import { Box, Flex, Skeleton } from "@mantine/core";

export function PlayDetailsHeaderSkeleton() {
	return (
		<Box data-testid="play-details-header-skeleton">
			<Flex direction="column" gap="lg">
				<Skeleton h="20px" w="256px" />
				<Box>
					<Skeleton h="24px" mb="xs" w="64px" />
					<Skeleton h="16px" w="128px" />
				</Box>
			</Flex>
		</Box>
	);
}
