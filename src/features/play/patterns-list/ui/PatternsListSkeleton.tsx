import { Group, Skeleton } from "@mantine/core";
import { useMemo } from "react";

export function PatternsListSkeleton() {
	const content = useMemo(
		() =>
			new Array(2)
				.fill(null)
				.map((_, index) => <Skeleton key={+index} h="72px" w="72px" />),
		[],
	);

	return (
		<Group
			data-testid="patterns-list-skeleton"
			justify="center"
			gap="xs"
			wrap="wrap"
		>
			{content}
		</Group>
	);
}
