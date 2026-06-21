import { Grid, Skeleton } from "@mantine/core";
import { useMemo } from "react";

export function PlayBoardListSkeleton() {
	const content = useMemo(
		() =>
			new Array(3).fill(null).map((_, index) => (
				<Grid.Col key={+index} span={{ base: 12, sm: 6 }}>
					<Skeleton h="192px" w="100%" />
				</Grid.Col>
			)),
		[],
	);

	return <Grid>{content}</Grid>;
}
