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
                {row.map(value => <Badge 
                    color={highlight?.(value) ? "amber" : "blue"} 
                    style={{ fontSize: "24px", height: "36px",  display: "flex", justifyContent: "center", width: "36px"}}
                >
                    {value}
                </Badge>)}
            </Flex>)}
        </Flex>
    </Card>
}
