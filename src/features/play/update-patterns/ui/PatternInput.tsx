import {
	ActionIcon,
	Box,
	Button,
	Group,
	Stack,
	UnstyledButton,
} from "@mantine/core";
import { useMemo } from "react";
import type { IGame, IWithBoardTemplate } from "@/features/game/core/domain";
import type { IPattern } from "@/features/play/core/domain";
import { PlusIcon, TrashIcon } from "@/shared/icons";

type Grid = IWithBoardTemplate<IGame>["boardTemplate"]["grid"];

export interface PatternInputProps {
	colors: {
		available: string;
		blocked: string;
		winning: string;
	};
	grid: Grid;
	value: IPattern["body"];
	patterns: IPattern[];
	patternsCount: number;
	selectedPatternId?: string;
	onPatternSelect: (id: string) => void;
	onPatternChange: (value: IPattern["body"]) => void;
	onAddPattern: () => void;
	onDeletePattern: () => void;
}

export function PatternInput({
	colors,
	grid,
	value,
	patterns,
	patternsCount,
	selectedPatternId,
	onPatternSelect,
	onPatternChange,
	onAddPattern,
	onDeletePattern,
}: PatternInputProps) {
	const columns = useMemo(
		() => grid.reduce((max, row) => Math.max(max, row.length), 0),
		[grid],
	);

	const onToggleCell = (rowIndex: number, columnIndex: number) => {
		const cell = grid[rowIndex][columnIndex];

		if (cell.type === "blocked") return;

		const newPattern: IPattern["body"] = grid.map((row, ri) =>
			row.map((_, ci) => value.at(ri)?.at(ci) ?? false),
		);
		if (0 <= rowIndex && rowIndex < newPattern.length) {
			const row = newPattern[rowIndex];
			if (0 <= columnIndex && columnIndex < row.length)
				row[columnIndex] = !row[columnIndex];
		}

		onPatternChange(newPattern);
	};

	return (
		<Group align="stretch" gap="md" wrap="nowrap">
			<Stack
				w={{ base: "100px", sm: "200px" }}
				gap="xs"
				justify="space-between"
				style={{
					flexShrink: 0,
				}}
			>
				<Stack gap="xs">
					{patterns.map((pattern, index) => (
						<Group key={pattern.id} gap="xs" wrap="nowrap">
							<Button
								variant={pattern.id === selectedPatternId ? "light" : "subtle"}
								flex={1}
								justify="start"
								onClick={() => onPatternSelect(pattern.id)}
							>
								Pattern {index + 1}
							</Button>

							<ActionIcon
								variant="outline"
								color="red"
								disabled={patternsCount <= 1}
								onClick={onDeletePattern}
								aria-label={`Delete pattern ${index + 1}`}
								p="0.25rem"
							>
								<TrashIcon />
							</ActionIcon>
						</Group>
					))}
				</Stack>
				<Button
					leftSection={<PlusIcon height={16} width={16} />}
					onClick={onAddPattern}
				>
					Add Pattern
				</Button>
			</Stack>

			<Box
				flex={1}
				style={{
					minWidth: 0,
					display: "grid",
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
					aspectRatio: `${columns} / ${grid.length}`,
				}}
			>
				{grid.map((row, rowIndex) =>
					row.map((cell, columnIndex) => {
						const selected = value.at(rowIndex)?.at(columnIndex) ?? false;
						const blocked = cell.type === "blocked";

						return (
							<UnstyledButton
								key={`${rowIndex}-${+columnIndex}`}
								disabled={blocked}
								onClick={() => onToggleCell(rowIndex, columnIndex)}
								aria-label={`Cell ${rowIndex + 1}, ${columnIndex + 1}`}
								style={{
									minWidth: 0,
									minHeight: 0,
									border: "1px solid var(--mantine-color-default-border)",
									background: blocked
										? colors.blocked
										: selected
											? colors.winning
											: colors.available,
									cursor: blocked ? "not-allowed" : "pointer",
								}}
							/>
						);
					}),
				)}
			</Box>
		</Group>
	);
}
