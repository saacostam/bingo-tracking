import { useCallback, useMemo } from "react";
import type { ILoginClient } from "@/features/login/domain";

export function useLoginClient(): ILoginClient {
	const login: ILoginClient["login"] = useCallback(async () => {
		await new Promise<void>((res) => setTimeout(res, 10));

		return {
			token: "MOCK_TOKEN",
		};
	}, []);

	return useMemo(
		() => ({
			login,
		}),
		[login],
	);
}
