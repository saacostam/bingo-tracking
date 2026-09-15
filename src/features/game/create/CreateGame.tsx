import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Flex, TextInput } from "@mantine/core";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCreateGameMutation } from "@/features/game/core/app";
import type { IGameClientPayload } from "@/features/game/core/domain";

export interface CreateGameProps {
	onError: (e: unknown) => void;
	onSettled: () => void;
	onSuccess: (req: IGameClientPayload["createGame"]["res"]) => void;
}

const schema = z.object({
	name: z.string().min(1, { message: "Name is required" }).max(48),
});

export type ICreateGameForm = z.infer<typeof schema>;

export function CreateGame({ onError, onSettled, onSuccess }: CreateGameProps) {
	const createGameMutation = useCreateGameMutation();

	const { formState, handleSubmit, register } = useForm({
		defaultValues: {
			name: "",
		},
		resolver: zodResolver(schema),
	});

	const rootErrorMessage = formState.errors.root?.message;

	const onSubmit = useCallback(
		(data: ICreateGameForm) => {
			createGameMutation.mutate(
				{
					name: data.name,
				},
				{
					onError,
					onSettled,
					onSuccess,
				},
			);
		},
		[createGameMutation.mutate, onError, onSettled, onSuccess],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap="lg">
				<TextInput
					label="Name"
					placeholder="Name"
					{...register("name")}
					error={formState.errors.name?.message}
				/>

				{rootErrorMessage && <Alert color="pink" title={rootErrorMessage} />}

				<Button loading={createGameMutation.isPending} type="submit">
					Create
				</Button>
			</Flex>
		</form>
	);
}
