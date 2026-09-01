import { Grid } from "@mantine/core";
import { type ComponentType, useMemo } from "react";
import { computeBoardLayoutValues } from "@/features/board/core/app";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { computeCompletionPercentage } from "@/features/play/board-list/domain";
import type { IPlay } from "@/features/play/core/domain";
import type { BoardItemProps } from "./BoardItem";

export interface PlayBoardListContentProps {
	BoardItem: ComponentType<BoardItemProps>;
	boards: IBoard[];
	boardTemplate: IBoardTemplate;
	takenNumbers: IPlay["takenNumbers"];
}

export function PlayBoardListContent({
	BoardItem,
	boards,
	boardTemplate,
	takenNumbers,
}: PlayBoardListContentProps) {
	const sortedBoards = useMemo(
		() =>
			boards
				.map((board) => {
					const { values } = computeBoardLayoutValues(
						boardTemplate,
						board.values,
					);

					return {
						board,
						completionPercentage: computeCompletionPercentage({
							boardNumbers: values,
							takenNumbers,
						}),
					};
				})
				.sort((a, b) => b.completionPercentage - a.completionPercentage),
		[boards, boardTemplate, takenNumbers],
	);

	return (
		<Grid>
			{sortedBoards.map(({ board }) => (
				<BoardItem
					key={board.id}
					board={board}
					boardTemplate={boardTemplate}
					takenNumbers={takenNumbers}
				/>
			))}
		</Grid>
	);
}
