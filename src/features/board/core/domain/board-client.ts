import type { IBoard } from "@/features/board/core/domain/board";

export interface IBoardClient {
	create(
		req: IBoardClientPayload["Create"]["Req"],
	): Promise<IBoardClientPayload["Create"]["Res"]>;
	delete(req: IBoardClientPayload["Delete"]["Req"]): Promise<void>;
	getById(
		req: IBoardClientPayload["GetById"]["Req"],
	): Promise<IBoardClientPayload["GetById"]["Res"]>;
	readFromFile(
		req: IBoardClientPayload["ReadFromFile"]["Req"],
	): Promise<IBoardClientPayload["ReadFromFile"]["Res"]>;
	update(req: IBoardClientPayload["Update"]["Req"]): Promise<void>;
}

export interface IBoardClientPayload {
	Create: {
		Req: {
			gameId: string;
			name: string;
			values: IBoard["values"];
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
	ReadFromFile: {
		Req: {
			file: File;
		};
		Res: {
			values: IBoard["values"];
		};
	};
	Update: {
		Req: {
			boardId: string;
			board: Omit<IBoard, "id" | "gameId">;
		};
	};
}
