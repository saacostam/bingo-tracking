import { Divider, Flex, Paper, Title } from "@mantine/core";
import type { IBoard } from "@/features/board/core/domain";
import { BoardGrid } from "./BoardGrid";

export interface BoardProps {
	board: IBoard;
}

export function Board({ board }: BoardProps) {
	return (
		<Paper key={board.id} h="100%" p="sm" withBorder>
			<Flex direction="column" gap="sm">
				<Title size="h4" ta="center">
					{board.name}
				</Title>
				<Divider />
				<Flex justify="center">
					<BoardGrid grid={board.grid} />
				</Flex>
			</Flex>
		</Paper>
	);
}
