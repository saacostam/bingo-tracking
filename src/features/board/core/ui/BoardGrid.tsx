import { Avatar, Flex, type MantineSpacing } from "@mantine/core";
import type { PropsWithChildren } from "react";
import type { IBoard, IBoardCell } from "@/features/board/core/domain";

export interface BoardGridProps {
	grid: IBoard["grid"];
}

export function BoardGrid({ grid }: BoardGridProps) {
	const [row1, row2, row3, row4, row5] = grid;

	const gap: MantineSpacing = "0.5rem";

	return (
		<Flex direction="column" gap={gap}>
			<Flex gap={gap}>{row1.map(mapCell)}</Flex>
			<Flex gap={gap}>{row2.map(mapCell)}</Flex>

			<Flex gap={gap}>
				{row3.slice(0, 2).map(mapCell)}
				<BoardGridItem accent>-</BoardGridItem>
				{row3.slice(2, 4).map(mapCell)}
			</Flex>

			<Flex gap={gap}>{row4.map(mapCell)}</Flex>
			<Flex gap={gap}>{row5.map(mapCell)}</Flex>
		</Flex>
	);
}

export interface BoardGridItemProps {
	accent?: boolean;
}

function BoardGridItem({
	accent,
	children,
}: PropsWithChildren<BoardGridItemProps>) {
	return <Avatar color={accent ? "yellow" : "indigo"}>{children}</Avatar>;
}

const mapCell = (cell: IBoardCell, index: number) => (
	<BoardGridItem key={+index}>{String(cell)}</BoardGridItem>
);
