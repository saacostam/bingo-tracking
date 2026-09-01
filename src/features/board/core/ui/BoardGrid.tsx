import { Avatar, Flex, type MantineSpacing } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { useBoardLayoutValues } from "@/features/board/core/app";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";

export interface BoardGridProps {
	boardTemplate: IBoardTemplate;
	values: IBoard["values"];
}

export function BoardGrid({ boardTemplate, values }: BoardGridProps) {
	const gap: MantineSpacing = "0.5rem";

	const { valueByPosition } = useBoardLayoutValues(boardTemplate, values);

	return (
		<Flex direction="column" gap={gap}>
			{boardTemplate.grid.map((row, ii) => (
				<Flex key={+ii} gap={gap}>
					{row.map((cell, jj) => {
						const value = valueByPosition[ii][jj];

						return (
							<BoardGridItem key={+jj} accent={cell.type === "blocked"}>
								{value !== undefined ? String(value) : " "}
							</BoardGridItem>
						);
					})}
				</Flex>
			))}
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
