import { useCallback, useMemo } from "react";
import { z } from "zod";
import type { IUserClient } from "@/features/user/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";

const capabilitiesValidator = z.object({
	vision: z.boolean(),
});

export function useUserClient(): IUserClient {
	const { fetcherAdapter } = useAdapters();

	const getCapabilities: IUserClient["getCapabilities"] =
		useCallback(async () => {
			const response = await fetcherAdapter.get("/user/capabilities");

			return capabilitiesValidator.parse(response);
		}, [fetcherAdapter]);

	return useMemo(
		() => ({
			getCapabilities,
		}),
		[getCapabilities],
	);
}
