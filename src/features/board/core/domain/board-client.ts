import type { IBoard } from "@/features/board/core/domain/board";

export interface IBoardClient {
	create(
		req: IBoardClientPayload["create"]["req"],
	): Promise<IBoardClientPayload["create"]["res"]>;
	delete(req: IBoardClientPayload["delete"]["req"]): Promise<void>;
	getById(
		req: IBoardClientPayload["getById"]["req"],
	): Promise<IBoardClientPayload["getById"]["res"]>;
	readFromFile(
		req: IBoardClientPayload["readFromFile"]["req"],
	): Promise<IBoardClientPayload["readFromFile"]["res"]>;
	update(req: IBoardClientPayload["update"]["req"]): Promise<void>;
}

export interface IBoardClientPayload {
	create: {
		req: {
			gameId: string;
			name: string;
			values: IBoard["values"];
		};
		res: {
			id: string;
		};
	};
	delete: {
		req: {
			boardId: string;
		};
	};
	getById: {
		req: {
			boardId: string;
		};
		res: {
			board: IBoard;
		};
	};
	readFromFile: {
		req: {
			file: File;
			boardTemplateId: string;
		};
		res: {
			values: IBoard["values"];
		};
	};
	update: {
		req: {
			boardId: string;
			board: Omit<IBoard, "id" | "gameId">;
		};
	};
}
