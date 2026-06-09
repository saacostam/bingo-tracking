import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Flex, TextInput } from "@mantine/core";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutationCreatePlay } from "@/features/play/core/app";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface CreatePlayProps {
	gameId: string;
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: () => void;
}

const schema = z.object({
	name: z.string().min(1, { message: "Name is required" }).max(48),
});

export type ICreatePlayForm = z.infer<typeof schema>;

export function CreatePlay({
	gameId,
	onError,
	onSettled,
	onSuccess,
}: CreatePlayProps) {
	const { lang } = useAdapters();

	const createPlayMutation = useMutationCreatePlay();

	const { formState, handleSubmit, register } = useForm({
		defaultValues: {
			name: "",
		},
		resolver: zodResolver(schema),
	});

	const rootErrorMessage = formState.errors.root?.message;

	const onSubmit = useCallback(
		(data: ICreatePlayForm) => {
			createPlayMutation.mutate(
				{
					gameId,
					name: data.name,
				},
				{
					onError,
					onSettled,
					onSuccess,
				},
			);
		},
		[createPlayMutation.mutate, gameId, onError, onSettled, onSuccess],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap="lg">
				<TextInput
					label={lang.get(ILanguageAdapterKey.MANAGE_PLAY_NAME_FIELD_LABEL)}
					placeholder={lang.get(
						ILanguageAdapterKey.MANAGE_PLAY_NAME_FIELD_LABEL,
					)}
					{...register("name")}
					error={formState.errors.name?.message}
				/>

				{rootErrorMessage && <Alert color="pink" title={rootErrorMessage} />}

				<Button loading={createPlayMutation.isPending} type="submit">
					{lang.get(ILanguageAdapterKey.CREATE_PLAY_SUBMIT_FORM)}
				</Button>
			</Flex>
		</form>
	);
}
