import { Callout, Flex, Spinner } from "@radix-ui/themes";
import { useQueryBingoCards } from "./useQueryBingoCards";
import { BingoCard } from "./BingoCard";

export function BingoCards() {
    const queryBingoCards = useQueryBingoCards();

    if (queryBingoCards.isSuccess) {
        if (queryBingoCards.data.length === 0) return <Callout.Root>
            <Callout.Text>No tienes cartones</Callout.Text>
        </Callout.Root>

        return <Flex direction="column" gap="2">
            {queryBingoCards.data.map(card => 
                <BingoCard 
                    key={card.id}
                    card={card}
                />
            )}
        </Flex>
    }

    if (queryBingoCards.isError) return <Callout.Root color="red">
        <Callout.Text>Unable to retrieve bingo cards</Callout.Text>
    </Callout.Root>

    return <Spinner />
}
