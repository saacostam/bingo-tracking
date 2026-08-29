import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import type { IPlay } from "@/features/play/core/domain";

export interface IGame {
	id: string;
	name: string;
	createdAt: number;
}

export type IWithBoards<G> = G & {
	boards: IBoard[];
};

export type IWithPlays<G> = G & {
	plays: IPlay[];
};

export type IWithBoardTemplate<G> = G & {
	boardTemplate: IBoardTemplate;
};
