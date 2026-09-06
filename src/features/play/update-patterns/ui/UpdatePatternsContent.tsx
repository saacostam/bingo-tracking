import { Alert, Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import type { IGame, IWithBoardTemplate } from "@/features/game/core/domain";
import { useUpdatePatternsMutation } from "@/features/play/core/app";
import type { IPattern, IPlay } from "@/features/play/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";

import { PatternInput } from "./PatternInput";

export interface UpdatePatternsContentProps {
	game: IWithBoardTemplate<IGame>;
	play: IPlay;
	onClose: () => void;
}

const gridColorKeys = ["available", "blocked", "winning"] as const;

type GridColorKey = (typeof gridColorKeys)[number];

const gridColors: Record<GridColorKey, { bg: string; label: string }> = {
	available: {
		bg: "var(--mantine-primary-color-5)",
		label: "Available",
	},
	blocked: {
		bg: "var(--mantine-color-gray-3)",
		label: "Blocked",
	},
	winning: {
		bg: "var(--mantine-color-green-6)",
		label: "Winning",
	},
};

export function UpdatePatternsContent({
	game,
	play,
	onClose,
}: UpdatePatternsContentProps) {
	const { notificationAdapter, uuidAdapter } = useAdapters();

	const updatePatterns = useUpdatePatternsMutation();

	const [patterns, setPatterns] = useState(play.patterns);
	const [selectedPatternId, setSelectedPatternId] = useState(
		play.patterns[0]?.id,
	);

	const selectedPattern = patterns.find(
		(pattern) => pattern.id === selectedPatternId,
	);

	const onPatternChange = useCallback(
		(body: IPattern["body"]) => {
			if (!selectedPattern) return;

			setPatterns((current) =>
				current.map((pattern) =>
					pattern.id === selectedPattern.id ? { ...pattern, body } : pattern,
				),
			);
		},
		[selectedPattern],
	);

	const onAddPattern = useCallback(() => {
		const pattern: IPattern = {
			id: uuidAdapter.gen(),
			body: game.boardTemplate.grid.map((row) => row.map(() => false)),
		};

		setPatterns((current) => [...current, pattern]);
		setSelectedPatternId(pattern.id);
	}, [game.boardTemplate.grid, uuidAdapter.gen]);

	const onDeletePattern = useCallback(() => {
		if (!selectedPattern || patterns.length <= 1) return;

		setPatterns((current) =>
			current.filter((pattern) => pattern.id !== selectedPattern.id),
		);

		const nextPattern = patterns.find(
			(pattern) => pattern.id !== selectedPattern.id,
		);

		if (!nextPattern) return;

		setSelectedPatternId(nextPattern.id);
	}, [patterns, selectedPattern]);

	const onSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: "Updated",
			msg: "Winning patterns updated successfully.",
		});
	}, [notificationAdapter.notify]);

	const onError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: "Error",
			msg: "Unable to update winning patterns.",
		});
	}, [notificationAdapter.notify]);

	const onSubmit = useCallback(() => {
		updatePatterns.mutate(
			{
				playId: play.id,
				patterns: patterns.map(({ body }) => body),
			},
			{
				onSuccess,
				onError,
				onSettled: onClose,
			},
		);
	}, [onClose, onError, onSuccess, patterns, play.id, updatePatterns.mutate]);

	const colors = useMemo(
		() => ({
			available: gridColors.available.bg,
			blocked: gridColors.blocked.bg,
			winning: gridColors.winning.bg,
		}),
		[],
	);

	return (
		<Stack gap="md">
			<Text size="sm">Select the cells that form each winning pattern.</Text>

			<Divider />

			<Alert variant="light">
				<Group gap="lg">
					{gridColorKeys.map((key) => (
						<Group key={key} gap="xs">
							<Box
								w={12}
								h={12}
								bg={gridColors[key].bg}
								style={{ borderRadius: "var(--mantine-radius-sm)" }}
							/>
							<Text size="sm">{gridColors[key].label}</Text>
						</Group>
					))}
				</Group>
			</Alert>

			<PatternInput
				colors={colors}
				grid={game.boardTemplate.grid}
				value={selectedPattern?.body ?? []}
				patternsCount={patterns.length}
				selectedPatternId={selectedPatternId}
				patterns={patterns}
				onPatternSelect={setSelectedPatternId}
				onPatternChange={onPatternChange}
				onAddPattern={onAddPattern}
				onDeletePattern={onDeletePattern}
			/>

			<Divider />

			<Group justify="end" gap="md" wrap="wrap">
				<Button onClick={onClose} variant="outline">
					Close
				</Button>
				<Button onClick={onSubmit} loading={updatePatterns.isPending}>
					Save
				</Button>
			</Group>
		</Stack>
	);
}
