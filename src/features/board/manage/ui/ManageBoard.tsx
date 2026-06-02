import {
	Alert,
	Box,
	Button,
	Divider,
	Flex,
	NumberInput,
	SimpleGrid,
	Text,
	TextInput,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import type {
	IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface ManageBoardProps {
	action: string;
	form: ReturnType<typeof useManageBoardForm>;
	isPending: boolean;
	onSubmit: (data: IManageBoardForm) => void;
}

export function ManageBoard({
	action,
	form,
	isPending,
	onSubmit,
}: ManageBoardProps) {
	const { lang } = useAdapters();

	const { control, register, handleSubmit, formState } = form;

	const rootErrorMessage = formState.errors.root?.message;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap="lg">
				<TextInput
					label={lang.get(ILanguageAdapterKey.MANAGE_GAME_NAME_FIELD_LABEL)}
					placeholder={lang.get(
						ILanguageAdapterKey.MANAGE_GAME_NAME_FIELD_LABEL,
					)}
					{...register("name")}
					error={formState.errors.name?.message}
				/>

				<Divider />

				<Box>
					<Text mb="0.125rem" size="sm">
						{lang.get(ILanguageAdapterKey.MANAGE_GAME_GRID_FIELD_LABEL)}
					</Text>

					<Flex direction="column" gap="xs">
						<BoardRow control={control} row={0} />
						<BoardRow control={control} row={1} />
						<BoardCenterRow control={control} />
						<BoardRow control={control} row={3} />
						<BoardRow control={control} row={4} />
					</Flex>
				</Box>

				{rootErrorMessage && <Alert color="pink" title={rootErrorMessage} />}

				<Button loading={isPending} type="submit">
					{action}
				</Button>
			</Flex>
		</form>
	);
}

interface BoardRowProps {
	control: ManageBoardProps["form"]["control"];
	row: 0 | 1 | 3 | 4;
}

function BoardRow({ control, row }: BoardRowProps) {
	return (
		<SimpleGrid cols={5} spacing="xs">
			{([0, 1, 2, 3, 4] as const).map((col) => (
				<BoardCellInput
					key={`${row}-${col}`}
					control={control}
					name={`grid.${row}.${col}` as const}
				/>
			))}
		</SimpleGrid>
	);
}

interface BoardCenterRowProps {
	control: ManageBoardProps["form"]["control"];
}

function BoardCenterRow({ control }: BoardCenterRowProps) {
	return (
		<SimpleGrid cols={5}>
			<BoardCellInput control={control} name="grid.2.0" />
			<BoardCellInput control={control} name="grid.2.1" />

			<Flex align="center" justify="center" />

			<BoardCellInput control={control} name="grid.2.2" />
			<BoardCellInput control={control} name="grid.2.3" />
		</SimpleGrid>
	);
}

interface BoardCellInputProps {
	control: ManageBoardProps["form"]["control"];
	name:
		| `grid.0.${0 | 1 | 2 | 3 | 4}`
		| `grid.1.${0 | 1 | 2 | 3 | 4}`
		| `grid.2.${0 | 1 | 2 | 3}`
		| `grid.3.${0 | 1 | 2 | 3 | 4}`
		| `grid.4.${0 | 1 | 2 | 3 | 4}`;
}

function BoardCellInput({ control, name }: BoardCellInputProps) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<NumberInput
					styles={{
						input: {
							textAlign: "center",
						},
					}}
					{...control.register(name)}
					hideControls
					value={field.value ?? ""}
					error={fieldState.error?.message}
					placeholder="-"
					required
					onChange={(_value) => {
						const parsedValue = Number(_value);
						const value = Number.isNaN(parsedValue) ? 0 : parsedValue;
						field.onChange(value || 0);
					}}
					min={1}
					max={1000}
				/>
			)}
		/>
	);
}
