import type { IBoard } from "@/features/board/core/domain/board";

export interface IBoardClient {
	create(
		req: IBoardClientPayload["Create"]["Req"],
	): Promise<IBoardClientPayload["Create"]["Res"]>;
	delete(req: IBoardClientPayload["Delete"]["Req"]): Promise<void>;
}

export interface IBoardClientPayload {
	Create: {
		Req: {
			gameId: string;
			name: string;
			grid: IBoard["grid"];
		};
		Res: {
			id: string;
		};
	};
	Delete: {
		Req: {
			boardId: string;
		};
	};
}
