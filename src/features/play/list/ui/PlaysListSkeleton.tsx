import { Box, Grid, Skeleton } from "@mantine/core";
import { useMemo } from "react";

export function PlaysListSkeleton() {
	const content = useMemo(
		() =>
			new Array(4).fill(null).map((_, index) => (
				<Grid.Col key={+index} span={{ base: 12, xs: 6, sm: 4 }}>
					<Skeleton h="76px" w="100%" />
				</Grid.Col>
			)),
		[],
	);

	return (
		<Box data-testid="plays-list-skeleton">
			<Grid gutter="md">{content}</Grid>
		</Box>
	);
}
