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
import type { IBoardTemplate } from "@/features/board/core/domain";
import type {
	IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface ManageBoardProps {
	action: string;
	boardTemplate: IBoardTemplate;
	form: ReturnType<typeof useManageBoardForm>;
	isPending: boolean;
	onSubmit: (data: IManageBoardForm) => void;
}

export function ManageBoard({
	action,
	boardTemplate,
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
						{boardTemplate.grid.map((row, ii) => (
							<SimpleGrid cols={row.length} key={+ii}>
								{row.map((cell, jj) => {
									if (cell.type === "blocked") {
										return <Flex key={+jj} align="center" justify="center" />;
									}

									return (
										<Controller
											key={+jj}
											control={control}
											name={`values.${ii}.${jj}`}
											render={({ field, fieldState }) => (
												<NumberInput
													styles={{
														input: {
															textAlign: "center",
														},
													}}
													hideControls
													value={field.value ?? ""}
													placeholder="-"
													required
													min={1}
													max={1000}
													onChange={(_value) => {
														const parsedValue = Number(_value);
														const value = Number.isNaN(parsedValue)
															? 0
															: parsedValue;

														field.onChange(value);
													}}
													onBlur={field.onBlur}
													error={fieldState.error?.message}
												/>
											)}
										/>
									);
								})}
							</SimpleGrid>
						))}
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
