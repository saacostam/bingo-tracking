import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert,
	Box,
	Button,
	Divider,
	Group,
	NumberInput,
	Stack,
	Text,
} from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { useSetBoardTemplateMutation } from "@/features/game/core/app";
import type { IGame, IWithBoardTemplate } from "@/features/game/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";

import { GridInput } from "./GridInput";

const boardRangeSchema = z
	.object({
		min: z.coerce.number<number>().int().min(1).max(299),
		max: z.coerce.number<number>().int().min(2).max(300),
	})
	.refine((data) => data.min < data.max, {
		message: "Maximum must be greater than minimum",
		path: ["max"],
	});

type BoardRangeForm = z.infer<typeof boardRangeSchema>;

export interface UpdateGameLayoutContentProps {
	game: IWithBoardTemplate<IGame>;
	onClose: () => void;
}

export function UpdateGameLayoutContent({
	game,
	onClose,
}: UpdateGameLayoutContentProps) {
	const { notificationAdapter } = useAdapters();
	const { boardTemplate } = game;

	const setBoardTemplate = useSetBoardTemplateMutation();

	const [grid, setGrid] = useState(boardTemplate.grid);

	const form = useForm<BoardRangeForm>({
		defaultValues: {
			min: boardTemplate.boardRange.min,
			max: boardTemplate.boardRange.max,
		},
		resolver: zodResolver(boardRangeSchema),
	});

	const onGridChange = useCallback((grid: typeof boardTemplate.grid) => {
		setGrid(grid);
	}, []);

	const onSuccess = useCallback(() => {
		notificationAdapter.notify({
			type: "success",
			title: "Updated",
			msg: "Board layout updated successfully.",
		});
	}, [notificationAdapter.notify]);

	const onError = useCallback(() => {
		notificationAdapter.notify({
			type: "error",
			title: "Error",
			msg: "Unable to update board layout.",
		});
	}, [notificationAdapter.notify]);

	const onSubmit = useCallback(
		(data: BoardRangeForm) => {
			setBoardTemplate.mutate(
				{
					gameId: game.id,
					boardTemplate: {
						grid,
						boardRange: {
							min: data.min,
							max: data.max,
						},
					},
				},
				{
					onSuccess,
					onError,
					onSettled: onClose,
				},
			);
		},
		[game.id, grid, setBoardTemplate.mutate, onSuccess, onError, onClose],
	);

	const gridColors = useMemo(
		() => ({
			available: "var(--mantine-primary-color-5)",
			blocked: "var(--mantine-color-gray-3)",
		}),
		[],
	);

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Stack gap="md">
				<Text size="sm">
					Match the layout to the dimensions and mark available and blocked
					slots.
				</Text>

				<Group grow>
					<Controller
						control={form.control}
						name="min"
						render={({ field, fieldState }) => (
							<NumberInput
								label="Minimum"
								min={1}
								max={299}
								{...field}
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={form.control}
						name="max"
						render={({ field, fieldState }) => (
							<NumberInput
								label="Maximum"
								min={2}
								max={300}
								{...field}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</Group>

				<Divider />

				<Alert variant="light">
					<Group gap="lg">
						<Group gap="xs">
							<Box
								w={12}
								h={12}
								bg={gridColors.available}
								style={{ borderRadius: "var(--mantine-radius-sm)" }}
							/>
							<Text size="sm">Available</Text>
						</Group>

						<Group gap="xs">
							<Box
								w={12}
								h={12}
								bg={gridColors.blocked}
								style={{ borderRadius: "var(--mantine-radius-sm)" }}
							/>
							<Text size="sm">Blocked</Text>
						</Group>
					</Group>
				</Alert>

				<GridInput color={gridColors} value={grid} onChange={onGridChange} />

				<Divider />

				<Group justify="end" gap="md" wrap="wrap">
					<Button onClick={onClose} variant="outline">
						Close
					</Button>

					<Button type="submit" loading={setBoardTemplate.isPending}>
						Save
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
