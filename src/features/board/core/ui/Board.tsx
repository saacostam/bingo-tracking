import { Divider, Flex, Paper, Title } from "@mantine/core";
import type { ReactNode } from "react";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { BoardGrid } from "./BoardGrid";

export interface BoardProps {
	board: IBoard;
	boardTemplate: IBoardTemplate;
	controls?: ReactNode;
}

export function Board({ board, boardTemplate, controls }: BoardProps) {
	return (
		<Paper key={board.id} data-testid="board-item" h="100%" p="sm" withBorder>
			<Flex direction="column" gap="sm">
				<Title size="h4" ta="center">
					{board.name}
				</Title>
				<Divider />
				<Flex justify="center">
					<BoardGrid boardTemplate={boardTemplate} values={board.values} />
				</Flex>
				{controls && (
					<>
						<Divider />
						{controls}
					</>
				)}
			</Flex>
		</Paper>
	);
}
