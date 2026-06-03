import { Divider, Flex, Skeleton } from "@mantine/core";

export function UpdateBoardSkeleton() {
	return (
		<Flex data-testid="update-board-skeleton" direction="column" gap="lg">
			<Skeleton h="60px" />
			<Divider />
			<Skeleton h="244px" />
			<Skeleton h="36px" />
		</Flex>
	);
}
