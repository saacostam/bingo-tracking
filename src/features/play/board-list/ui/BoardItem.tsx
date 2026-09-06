import {
	Badge,
	Box,
	Divider,
	Flex,
	Grid,
	Paper,
	Progress,
	Text,
	Title,
} from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { applyPatternToBoard } from "@/features/board/core/domain";
import type { IPattern, IPlay } from "@/features/play/core/domain";

export interface BoardItemProps {
	board: IBoard;
	boardTemplate: IBoardTemplate;
	name: string;
	pattern: IPattern;
	takenNumbers: IPlay["takenNumbers"];
}

export function BoardItem({
	board,
	boardTemplate,
	name,
	pattern,
	takenNumbers,
}: BoardItemProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const [w, setW] = useState(0);

	useEffect(() => {
		const mxRowLength = boardTemplate.grid.reduce(
			(mx, row) => Math.max(mx, row.length),
			0,
		);

		const updateWidth = () => {
			if (containerRef.current) {
				setW(containerRef.current.clientWidth / mxRowLength);
			}
		};

		updateWidth();

		const observer = new ResizeObserver(updateWidth);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, [boardTemplate.grid]);

	const valueToBoardTemplate = useMemo(
		() => applyPatternToBoard(boardTemplate, board.values, pattern),
		[board.values, boardTemplate, pattern],
	);

	const percentage = useMemo(() => {
		const isWinningCell = (
			cell: (typeof valueToBoardTemplate)[number][number],
		) => cell.type === "available" && cell.isWinning;

		const allWinningCells = valueToBoardTemplate.flat().filter(isWinningCell);
		const matchedCells = allWinningCells.filter(
			(cell) =>
				isWinningCell(cell) &&
				!!takenNumbers.find((number) => number === cell.value),
		);
		const ratio = Math.max(
			0,
			Math.min(matchedCells.length / allWinningCells.length, 1),
		);

		return ratio * 100;
	}, [takenNumbers, valueToBoardTemplate]);

	return (
		<Grid.Col span={{ base: 12, sm: 6 }}>
			<Paper p="xs" withBorder>
				<Flex direction="column" gap="xs">
					<Title size="h5" ta="center">
						{name}
					</Title>
					<Divider />
					<Flex direction="column" gap="0.25rem" ref={containerRef}>
						{valueToBoardTemplate.map((row, ii) => (
							<Flex key={+ii} justify="space-between">
								{row.map((cell, jj) => {
									const status: "empty" | "available" | "winning" =
										cell.type === "available"
											? cell.isWinning
												? "winning"
												: "available"
											: "empty";

									return (
										<Badge
											key={+jj}
											color={
												status === "winning"
													? "green"
													: status === "available"
														? "indigo"
														: "gray"
											}
											variant={
												takenNumbers.find((n) => n === cell.value)
													? "filled"
													: "light"
											}
											style={{
												height: w * 0.5,
												fontSize: Math.min(16, w / 4),
												width: w * 0.9,
											}}
										>
											{cell.value}
										</Badge>
									);
								})}
							</Flex>
						))}
					</Flex>
					<Divider />
					<Flex align="center" direction="row" gap="xs">
						<Text c="dimmed" size="sm">
							{percentage.toFixed(1)}%
						</Text>
						<Box flex={1}>
							<Progress
								color={percentage >= 100 ? "green" : undefined}
								value={percentage}
							/>
						</Box>
					</Flex>
				</Flex>
			</Paper>
		</Grid.Col>
	);
}
