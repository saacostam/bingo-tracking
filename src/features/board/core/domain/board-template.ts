export interface IBoardTemplate {
	grid: IBoardTemplateCell[][];
}

export type IBoardTemplateCell =
	| {
			type: "blocked";
	  }
	| {
			type: "available";
	  };
