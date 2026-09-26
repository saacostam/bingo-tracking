import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useQueryUserCapabilities() {
	const { user } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_USER_CAPABILITIES],
		queryFn: () => user.getCapabilities(),
	});
}
