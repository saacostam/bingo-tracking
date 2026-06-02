import type { IBoardClientPayload } from "@/features/board/core/domain";
import { MutationKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useMutationCreateBoard() {
	const { board } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.CREATE_BOARD],
		mutationFn: (req: IBoardClientPayload["Create"]["Req"]) =>
			board.create(req),
	});
}
