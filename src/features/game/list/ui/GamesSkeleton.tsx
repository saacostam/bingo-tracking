import { Grid, GridCol, Skeleton } from "@mantine/core";
import { useMemo } from "react";

export function GamesSkeleton() {
	const content = useMemo(() => {
		return new Array(3).fill(null).map((_, index) => (
			<GridCol key={+index} span={{ base: 12, sm: 6, md: 4 }}>
				<Skeleton h="72px" w="100%" />
			</GridCol>
		));
	}, []);

	return (
		<Grid data-testid="games-skeleton" gutter="md">
			{content}
		</Grid>
	);
}
