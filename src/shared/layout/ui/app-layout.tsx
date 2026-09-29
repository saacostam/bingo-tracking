import {
	AppShell,
	Button,
	Container,
	Flex,
	Group,
	UnstyledButton,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useCallback } from "react";
import { Link } from "react-router";
import { LanguageMenu } from "@/features/language/ui";
import { ThemeToggle } from "@/features/theme/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { Logo } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

export function AppLayout({ children }: PropsWithChildren) {
	const queryClient = useQueryClient();

	const { lang, sessionAdapter } = useAdapters();

	const onClickLogout = useCallback(() => {
		sessionAdapter.removeToken();
		queryClient.removeQueries();
	}, [queryClient.removeQueries, sessionAdapter.removeToken]);

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md">
					<Group justify="space-between" style={{ flex: 1 }}>
						<UnstyledButton
							component={Link}
							to={genRoute({
								name: RouteName.HOME,
							})}
						>
							<Logo />
						</UnstyledButton>
						<Flex gap="lg">
							<ThemeToggle />
							<LanguageMenu />
							<Button onClick={onClickLogout}>
								{lang.get(ILanguageAdapterKey.LOGOUT_BUTTON_CTA)}
							</Button>
						</Flex>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Main>
				<Container mx="auto">{children}</Container>
			</AppShell.Main>
		</AppShell>
	);
}
