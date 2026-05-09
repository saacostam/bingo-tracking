import { AlertDialog, Box, Button, Flex } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { BingoCards, BingoNumbers } from "../bingo";

export function Game() {
    const [numbers, setNumbers] = useState<number[]>([]);

    const bingoNumbersHighlight = useCallback((value: number) => numbers.includes(value), [numbers])

    const bingoNumbersOnClick = useCallback((value: number) => 
        setNumbers(currentNumbers => currentNumbers.includes(value) ? 
            currentNumbers.filter(n => n !== value) 
            : [...currentNumbers, value]), 
        []
    );

    return <Flex direction="row" gap="8">
        <Box>
            <BingoNumbers 
                height={5}
                highlight={bingoNumbersHighlight}
                onClick={bingoNumbersOnClick}
                width={15}
            />
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" mt="4">Reset</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Reset</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Confirmación
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancelar
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action
                            onClick={() => setNumbers([])}
                        >
                            <Button variant="solid" color="red">
                                Reset
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </Box>
        <BingoCards 
            highlight={bingoNumbersHighlight}
        />
    </Flex>
}
