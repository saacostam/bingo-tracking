import { Button, Divider, Flex, Grid, Paper, Text } from "@mantine/core";
import type { IBoard } from "@/features/board/core/domain";
import { BoardGrid } from "@/features/board/core/ui/BoardGrid";

export interface ReadFromFileContentProps {
	grid: IBoard["grid"];
	onUpdateGrid: (grid: IBoard["grid"]) => void;
	reset: () => void;
}

export function ReadFromFileContent({
	grid,
	onUpdateGrid,
	reset,
}: ReadFromFileContentProps) {
	return (
		<Paper p="md" withBorder>
			<Flex direction="column" gap="md">
				<Flex direction="column" gap={4}>
					<Text size="md" fw="bold">
						Confirm detected board
					</Text>

					<Text size="sm" c="dimmed">
						Review the extracted grid before applying changes.
					</Text>
				</Flex>

				<Flex align="center" justify="center">
					<BoardGrid grid={grid} />
				</Flex>

				<Divider />

				<Grid gutter="md">
					<Grid.Col span={{ base: 12, xs: 6 }}>
						<Button fullWidth variant="outline" onClick={reset}>
							Try again
						</Button>
					</Grid.Col>

					<Grid.Col span={{ base: 12, xs: 6 }}>
						<Button
							fullWidth
							onClick={() => {
								reset();
								onUpdateGrid(grid);
							}}
						>
							Accept board
						</Button>
					</Grid.Col>
				</Grid>
			</Flex>
		</Paper>
	);
}
