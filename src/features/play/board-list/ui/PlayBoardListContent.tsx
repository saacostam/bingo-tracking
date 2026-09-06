import { Grid } from "@mantine/core";
import { type ComponentType, useMemo } from "react";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { applyPatternToBoardAndGetPercentage } from "@/features/board/core/domain";
import type { IPattern, IPlay } from "@/features/play/core/domain";
import type { BoardItemProps } from "./BoardItem";

export interface PlayBoardListContentProps {
	BoardItem: ComponentType<BoardItemProps>;
	boards: IBoard[];
	boardTemplate: IBoardTemplate;
	patterns: IPattern[];
	takenNumbers: IPlay["takenNumbers"];
}

export function PlayBoardListContent({
	BoardItem,
	boards,
	boardTemplate,
	patterns,
	takenNumbers,
}: PlayBoardListContentProps) {
	const boardAndPatterns = useMemo(() => {
		const boardAndPatterns: {
			board: IBoard;
			pattern: IPattern;
			name: string;
			percentage: number;
		}[] = [];

		for (const board of boards) {
			for (let i = 0; i < patterns.length; i++) {
				const pattern = patterns[i];

				const percentage = applyPatternToBoardAndGetPercentage(
					boardTemplate,
					board.values,
					pattern,
					takenNumbers,
				);

				boardAndPatterns.push({
					board,
					pattern,
					name: `${board.name} - Pattern ${i + 1}`,
					percentage,
				});
			}
		}

		return [...boardAndPatterns].sort((a, b) =>
			a.percentage === b.percentage
				? a.name.localeCompare(b.name)
				: b.percentage - a.percentage,
		);
	}, [boardTemplate, boards, patterns, takenNumbers]);

	return (
		<Grid>
			{boardAndPatterns.map(({ board, name, pattern }) => (
				<BoardItem
					key={`${board.id}-${pattern.id}`}
					board={board}
					boardTemplate={boardTemplate}
					name={name}
					takenNumbers={takenNumbers}
					pattern={pattern}
				/>
			))}
		</Grid>
	);
}
