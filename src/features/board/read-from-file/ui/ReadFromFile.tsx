import { Flex } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useMutationReadBoardFromFile } from "@/features/board/core/app";
import type { IBoard } from "@/features/board/core/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { ReadFromFileContent } from "./ReadFromFileContent";
import { ReadFromFileEmptyState } from "./ReadFromFileEmptyState";
import { ReadFromFileLoadingState } from "./ReadFromFileLoadingState";

export interface ReadFromFileProps {
	onUpdateGrid: (grid: IBoard["grid"]) => void;
}

export function ReadFromFile({ onUpdateGrid }: ReadFromFileProps) {
	const [file, setFile] = useState<File | null>(null);

	const readBoardFromFile = useMutationReadBoardFromFile();

	useEffect(() => {
		if (file) {
			readBoardFromFile.mutate({ file });
		}
	}, [file, readBoardFromFile.mutate]);

	const reset = useCallback(() => {
		setFile(null);
		readBoardFromFile.reset();
	}, [readBoardFromFile.reset]);

	const retry = useRetry(reset, readBoardFromFile.isPending);

	return (
		<Flex direction="column" gap="lg">
			{file === null ? (
				<ReadFromFileEmptyState file={file} setFile={setFile} />
			) : readBoardFromFile.isSuccess ? (
				<ReadFromFileContent
					grid={readBoardFromFile.data.grid}
					onUpdateGrid={onUpdateGrid}
					reset={reset}
				/>
			) : readBoardFromFile.isError ? (
				<QueryError
					error={readBoardFromFile.error}
					msg="Unable to read image"
					retry={retry}
					where="ReadFromFile.readBoardFromFile.isError"
				/>
			) : (
				<ReadFromFileLoadingState />
			)}
		</Flex>
	);
}
