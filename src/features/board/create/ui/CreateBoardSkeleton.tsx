import { Divider, Flex, Skeleton } from "@mantine/core";

export function CreateBoardSkeleton() {
	return (
		<Flex data-testid="create-board-skeleton" direction="column" gap="lg">
			<Skeleton h="60px" />
			<Divider />
			<Skeleton h="244px" />
			<Skeleton h="36px" />
		</Flex>
	);
}
