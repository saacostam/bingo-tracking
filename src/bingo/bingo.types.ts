export interface IBingoCard {
    id: string;
    board: IBingoCardCell[][];
}

export interface IBingoCardCell {
    id: string;
    value: number;
}
