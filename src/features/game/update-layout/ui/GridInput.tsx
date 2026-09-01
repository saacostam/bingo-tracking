import { Button, Flex, Group, Stack, UnstyledButton } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { IGame, IWithBoardTemplate } from "@/features/game/core/domain";

type Grid = IWithBoardTemplate<IGame>["boardTemplate"]["grid"];

export interface GridInputProps {
	color: {
		available: string;
		blocked: string;
	};
	loading?: boolean;
	value: Grid;
	onChange: (value: Grid) => void;
}

export function GridInput({ color, loading, value, onChange }: GridInputProps) {
	const gridRef = useRef<HTMLDivElement>(null);
	const bottomButtonRef = useRef<HTMLButtonElement>(null);

	const [gridWidth, setGridWidth] = useState(0);
	const [gridHeight, setGridHeight] = useState(0);
	const [buttonSize, setButtonSize] = useState(0);

	useEffect(() => {
		const updateSize = () => {
			if (gridRef.current) {
				setGridWidth(gridRef.current.clientWidth);
				setGridHeight(gridRef.current.clientHeight);
			}

			if (bottomButtonRef.current) {
				setButtonSize(bottomButtonRef.current.clientHeight);
			}
		};

		updateSize();

		const observer = new ResizeObserver(updateSize);

		if (gridRef.current) observer.observe(gridRef.current);
		if (bottomButtonRef.current) observer.observe(bottomButtonRef.current);

		return () => observer.disconnect();
	}, []);

	const size = useMemo(() => {
		const columns = value.reduce((max, row) => Math.max(max, row.length), 0);

		return columns > 0 ? gridWidth / columns : 0;
	}, [value, gridWidth]);

	const onToggleCell = useCallback(
		(targetI: number, targetJ: number) => {
			onChange(
				value.map((row, i) =>
					row.map((cell, j) =>
						targetI === i && targetJ === j
							? {
									type: cell.type === "available" ? "blocked" : "available",
								}
							: cell,
					),
				),
			);
		},
		[value, onChange],
	);

	const onAddColumn = useCallback(() => {
		onChange(value.map((row) => [...row, { type: "available" }]));
	}, [value, onChange]);

	const onRemoveColumn = useCallback(() => {
		if (value.some((row) => row.length <= 1)) return;

		onChange(value.map((row) => row.slice(0, -1)));
	}, [value, onChange]);

	const onAddRow = useCallback(() => {
		onChange([...value, value[0]?.map(() => ({ type: "available" })) ?? []]);
	}, [value, onChange]);

	const onRemoveRow = useCallback(() => {
		if (value.length <= 1) return;

		onChange(value.slice(0, -1));
	}, [value, onChange]);

	return (
		<Stack h="100%" w="100%" gap="xs">
			<Group gap="xs" align="flex-start" wrap="nowrap">
				<div
					ref={gridRef}
					style={{
						flex: 1,
						minWidth: 0,
					}}
				>
					<Flex direction="column" gap="0">
						{value.map((row, i) => (
							<Flex key={+i} gap="0">
								{row.map((cell, j) => (
									<UnstyledButton
										key={+j}
										w={size}
										h={size}
										onClick={() => onToggleCell(i, j)}
										style={{
											border: "1px solid var(--mantine-color-default-border)",
											background:
												cell.type === "blocked"
													? color.blocked
													: color.available,
										}}
									/>
								))}
							</Flex>
						))}
					</Flex>
				</div>

				<Stack gap="xs">
					<Button
						loading={loading}
						w={buttonSize}
						h={gridHeight / 2}
						p={0}
						onClick={onAddColumn}
					>
						+
					</Button>

					<Button
						loading={loading}
						w={buttonSize}
						h={gridHeight / 2}
						p={0}
						onClick={onRemoveColumn}
						variant="outline"
					>
						-
					</Button>
				</Stack>
			</Group>

			<Group gap="xs" w={gridWidth}>
				<Button
					loading={loading}
					ref={bottomButtonRef}
					flex={1}
					onClick={onAddRow}
				>
					+
				</Button>

				<Button
					loading={loading}
					flex={1}
					onClick={onRemoveRow}
					variant="outline"
				>
					-
				</Button>
			</Group>
		</Stack>
	);
}
