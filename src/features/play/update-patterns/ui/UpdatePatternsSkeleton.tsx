import { Skeleton, Stack } from "@mantine/core";
import { useMemo } from "react";

export function UpdatePatternsSkeleton() {
	const content = useMemo(
		() =>
			new Array(2)
				.fill(null)
				.map((_, index) => <Skeleton key={+index} h="64px" />),
		[],
	);

	return (
		<Stack data-testid="update-patterns-skeleton" gap="xs">
			<Skeleton h="128px" />
			{content}
		</Stack>
	);
}
