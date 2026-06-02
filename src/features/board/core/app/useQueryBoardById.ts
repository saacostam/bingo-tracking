import { QueryKeys, useMetaQuery } from "@/shared/async-state";
import { useClients } from "@/shared/clients/app";

export interface UseQueryBoardByIdArgs {
	boardId: string;
}

export function useQueryBoardById({ boardId }: UseQueryBoardByIdArgs) {
	const { board } = useClients();

	return useMetaQuery({
		queryKey: [QueryKeys.GET_BOARD_BY_ID, boardId],
		queryFn: () => board.getById({ boardId }),
	});
}
