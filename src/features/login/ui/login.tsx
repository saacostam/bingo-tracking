import {
	Alert,
	Box,
	Button,
	Card,
	Divider,
	PasswordInput,
	Space,
	Text,
	TextInput,
} from "@mantine/core";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useLogin } from "../app";

export function MockLogin() {
	const { lang } = useAdapters();

	const { form, isLoading, onSubmit } = useLogin();

	const errors = form.formState.errors;
	const rootErrorMessage = errors.root?.message;

	return (
		<Card mx="auto" maw="512" withBorder data-testid="login">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box ta="center" mb="md">
					<Text size="xl" fw="bold">
						{lang.get(ILanguageAdapterKey.LOGIN_HEADER)}
					</Text>
					<Text size="sm">
						{lang.get(ILanguageAdapterKey.LOGIN_DESCRIPTION)}
					</Text>
				</Box>
				<TextInput
					size="sm"
					label={lang.get(ILanguageAdapterKey.LOGIN_USERNAME_FIELD_LABEL)}
					placeholder={lang.get(ILanguageAdapterKey.LOGIN_USERNAME_FIELD_LABEL)}
					{...form.register("username")}
					error={errors.username?.message}
				/>
				<Space h="md" />
				<PasswordInput
					size="sm"
					label={lang.get(ILanguageAdapterKey.LOGIN_PASSWORD_FIELD_LABEL)}
					placeholder={lang.get(ILanguageAdapterKey.LOGIN_PASSWORD_FIELD_LABEL)}
					{...form.register("password")}
					error={errors.password?.message}
				/>
				{rootErrorMessage && (
					<>
						<Space h="xl" />
						<Alert color="red" title={rootErrorMessage} />
					</>
				)}
				<Space h="xl" />
				<Button fullWidth loading={isLoading} type="submit">
					{lang.get(ILanguageAdapterKey.LOGIN_SUBMIT_CTA)}
				</Button>
			</form>
			<Divider my="md" />
			<Alert>
				{lang.get(ILanguageAdapterKey.LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER)}
			</Alert>
		</Card>
	);
}
