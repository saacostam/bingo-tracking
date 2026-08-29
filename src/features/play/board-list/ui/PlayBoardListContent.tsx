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
import type { IPlay } from "@/features/play/core/domain";

export interface PlayBoardListContentProps {
	boards: IBoard[];
	boardTemplate: IBoardTemplate;
	takenNumbers: IPlay["takenNumbers"];
}

export function PlayBoardListContent({
	boards,
	boardTemplate,
	takenNumbers,
}: PlayBoardListContentProps) {
	return (
		<Grid>
			{boards.map((b) => (
				<BoardItem
					key={b.id}
					board={b}
					boardTemplate={boardTemplate}
					takenNumbers={takenNumbers}
				/>
			))}
		</Grid>
	);
}

export interface BoardItemProps {
	board: IBoard;
	boardTemplate: IBoardTemplate;
	takenNumbers: IPlay["takenNumbers"];
}

function BoardItem({ board, boardTemplate, takenNumbers }: BoardItemProps) {
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

	const boardNumbers = useMemo(() => board.values, [board.values]);
	const percentage = useMemo(() => {
		const numerator = boardNumbers.filter((n) =>
			takenNumbers.includes(n),
		).length;
		const denominator = boardNumbers.length;

		const frac = (numerator / denominator) * 100;
		const val = Math.max(0, Math.min(frac, 100));

		return Number(val.toFixed(2));
	}, [boardNumbers, takenNumbers]);

	return (
		<Grid.Col span={{ base: 12, sm: 6 }}>
			<Paper p="xs" withBorder>
				<Flex direction="column" gap="xs">
					<Title size="h5" ta="center">
						{board.name}
					</Title>
					<Divider />
					<Flex direction="column" gap="0.25rem" ref={containerRef}>
						{boardTemplate.grid.map((row, ii) => (
							<Flex key={+ii} justify="space-between">
								{row.map((_, jj) => {
									const index = row.length * ii + jj;
									const value = board.values.at(index);

									const isActive =
										value !== undefined && takenNumbers.includes(value);

									return (
										<Badge
											key={+jj}
											color={isActive ? "indigo" : "gray"}
											variant={isActive ? "filled" : "light"}
											style={{
												height: w * 0.5,
												fontSize: Math.min(16, w / 4),
												width: w * 0.9,
											}}
										>
											{value}
										</Badge>
									);
								})}
							</Flex>
						))}
					</Flex>
					<Divider />
					<Flex align="center" direction="row" gap="xs">
						<Text c="dimmed" size="sm">
							{percentage}%
						</Text>
						<Box flex={1}>
							<Progress value={percentage} />
						</Box>
					</Flex>
				</Flex>
			</Paper>
		</Grid.Col>
	);
}
