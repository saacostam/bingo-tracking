import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import type { IBingoCard } from "./bingo.types";

export interface BingoCardProps {
    card: IBingoCard;
    highlight?: (value: number) => boolean;
}

export function BingoCard({
    card,
    highlight,
}: BingoCardProps) {
    return <Card style={{ width: "fit-content"}}>
        <Text color="indigo" weight="bold">ID: {card.id}</Text>
        <Flex mt="4" direction="row" gap="1">
            {card.board.map((row) => <Flex direction="column" gap="1">
                {row.map(value => <Badge color={highlight?.(value) ? "amber" : "blue"} style={{ fontSize: "16px", height: "32px", textAlign: "center", width: "32px"}}>
                    {value}
                </Badge>)}
            </Flex>)}
        </Flex>
    </Card>
}
