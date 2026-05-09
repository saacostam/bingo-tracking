import { Badge, Flex } from "@radix-ui/themes";
import { useMemo } from "react";

export interface BingoNumbersProps {
    height: number;
    highlight: (value: number) => boolean;
    onClick: (value: number) => void;
    width: number;
}

export function BingoNumbers({
    height,
    highlight,
    onClick,
    width,
}: BingoNumbersProps) {
    const values = useMemo(() => {
        const values: number[][] = [];

        for (let i = 0; i < height; i++) {
            const row: number[] = [];
            for (let j = 0; j < width; j++) {
                const val = i * width + j;
                row.push(val);
            }
            values.push(row);
        }
        
        return values;
    }, [height, width]);

    return <Flex direction="column" gap="1">
        {values.map(row => <Flex direction="row" gap="1">
            {row.map(value => <Badge
                color={highlight(value) ? "green" : "gray"} 
                onClick={() => onClick(value)}
                style={{ fontSize: "24px", height: "48px", display: "flex", justifyContent: "center", width: "48px", cursor: "pointer", userSelect: "none"}}
            >
                {value}
            </Badge>)}
        </Flex>)}
    </Flex>
}
