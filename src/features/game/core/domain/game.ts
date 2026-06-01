import type { IBoard } from "@/features/board/core/domain";

export interface IGame {
	id: string;
	name: string;
	createdAt: number;
}

export type IWithBoards<G> = G & {
	boards: IBoard[];
};
