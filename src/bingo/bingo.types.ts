export interface IBingoCard {
    id: string;
    board: [
        [IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell],
        [IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell],
        [IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell],
        [IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell],
        [IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell, IBingoCardCell],
    ];
}

export type IBingoCardCell = number;
