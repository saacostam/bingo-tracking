import { Group, Paper } from "@mantine/core";
import { useMemo } from "react";
import type { IGame, IWithBoardTemplate } from "@/features/game/core/domain";
import type { IPlay } from "@/features/play/core/domain";
import { type GetFillStyle, TiledGrid } from "@/shared/components";

export interface PatternsListContentProps {
	game: IWithBoardTemplate<IGame>;
	play: IPlay;
}

export function PatternsListContent({ game, play }: PatternsListContentProps) {
	const patterns: { getFillStyle: GetFillStyle; id: string }[] = useMemo(() => {
		const serializePair = (i: number, j: number): string => `${i}-${j}`;

		return play.patterns.map((pattern) => {
			const requiredCellsForWinning = new Set<string>();
			const availableButNotRequiredCells = new Set<string>();

			let patternIndex = 0;

			for (let i = 0; i < game.boardTemplate.grid.length; i++) {
				const row = game.boardTemplate.grid[i];

				for (let j = 0; j < row.length; j++) {
					const cell = row[j];
					const key = serializePair(i, j);

					if (cell.type === "available") {
						if (pattern.body.at(patternIndex) === true)
							requiredCellsForWinning.add(key);
						else availableButNotRequiredCells.add(key);

						patternIndex++;
					}
				}
			}

			return {
				getFillStyle: (i, j): string => {
					const key = serializePair(i, j);

					if (requiredCellsForWinning.has(key)) return "#f5bf4c";
					else if (availableButNotRequiredCells.has(key)) return "#4c6ef5";
					else return "white";
				},
				id: pattern.id,
			};
		});
	}, [game.boardTemplate.grid, play.patterns]);

	const gridDimensions = useMemo(
		() => ({
			height: game.boardTemplate.grid.at(0)?.length ?? 0,
			width: game.boardTemplate.grid.length,
		}),
		[game.boardTemplate.grid],
	);

	return (
		<Group justify="center" gap="xs" wrap="wrap">
			{patterns.map(({ id, getFillStyle }) => (
				<Paper key={id} h="72px" p="0.125rem" w="72px" withBorder>
					<TiledGrid
						getFillStyle={getFillStyle}
						gridDimensions={gridDimensions}
					/>
				</Paper>
			))}
		</Group>
	);
}
