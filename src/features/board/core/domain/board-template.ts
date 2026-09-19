export interface IBoardTemplate {
	id: string;
	grid: IBoardTemplateCell[][];
	boardRange: IBoardRange;
}

export type IBoardTemplateCell =
	| {
			type: "blocked";
	  }
	| {
			type: "available";
	  };

export interface IBoardRange {
	min: number;
	max: number;
}
