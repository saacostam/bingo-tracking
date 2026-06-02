import type { IBoard } from "@/features/board/core/domain/board";

export interface IBoardClient {
	create(
		req: IBoardClientPayload["Create"]["Req"],
	): Promise<IBoardClientPayload["Create"]["Res"]>;
	delete(req: IBoardClientPayload["Delete"]["Req"]): Promise<void>;
	getById(
		req: IBoardClientPayload["GetById"]["Req"],
	): Promise<IBoardClientPayload["GetById"]["Res"]>;
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
	GetById: {
		Req: {
			boardId: string;
		};
		Res: {
			board: IBoard;
		};
	};
}
