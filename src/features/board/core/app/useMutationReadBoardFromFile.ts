import type { IBoardClientPayload } from "@/features/board/core/domain";
import { MutationKeys, useMetaMutation } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export function useMutationReadBoardFromFile() {
	const { board } = useClients();

	return useMetaMutation({
		mutationKey: [MutationKeys.READ_BOARD_FROM_FILE],
		mutationFn: (req: IBoardClientPayload["readFromFile"]["req"]) =>
			board.readFromFile(req),
	});
}
