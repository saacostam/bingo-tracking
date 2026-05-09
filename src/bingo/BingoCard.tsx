import { Card, Flex } from "@radix-ui/themes";
import type { IBingoCard } from "./bingo.types";

export interface BingoCardProps {
    card: IBingoCard;
}

export function BingoCard({
    card,
}: BingoCardProps) {
    return <Flex direction="column" gap="1">
        {card.board.map((row) => <Flex direction="row" gap="1">
            {row.map(cell => <Card>
                {cell.value}
            </Card>)}
        </Flex>)}
    </Flex>
}
