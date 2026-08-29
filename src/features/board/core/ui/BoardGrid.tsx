import { Avatar, Flex, type MantineSpacing } from "@mantine/core";
import type { PropsWithChildren } from "react";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";

export interface BoardGridProps {
	boardTemplate: IBoardTemplate;
	values: IBoard["values"];
}

export function BoardGrid({ boardTemplate, values }: BoardGridProps) {
	const gap: MantineSpacing = "0.5rem";

	return (
		<Flex direction="column" gap={gap}>
			{boardTemplate.grid.map((row, ii) => (
				<Flex key={+ii} gap={gap}>
					{row.map((value, jj) => (
						<BoardGridItem key={+jj} accent={value.type === "blocked"}>
							{String(values.at(ii * row.length + jj))}
						</BoardGridItem>
					))}
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
