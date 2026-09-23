import { useCallback, useMemo } from "react";
import { z } from "zod";
import type { ILoginClient } from "@/features/login/domain";
import { useAdapters } from "@/shared/adapters/core/app";

const loginResponseValidator = z.object({
	token: z.string(),
});

export function useLoginClient(): ILoginClient {
	const { fetcherAdapter } = useAdapters();

	const login: ILoginClient["login"] = useCallback(
		async ({ username, password }) => {
			const response = await fetcherAdapter.post("/auth/login", {
				username,
				password,
			});

			return loginResponseValidator.parse(response);
		},
		[fetcherAdapter],
	);

	return useMemo(
		() => ({
			login,
		}),
		[login],
	);
}
