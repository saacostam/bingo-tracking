import { Flex } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useMutationReadBoardFromFile } from "@/features/board/core/app";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { useRetry } from "@/shared/async-state";
import { QueryError } from "@/shared/components";
import { ReadFromFileContent } from "./ReadFromFileContent";
import { ReadFromFileEmptyState } from "./ReadFromFileEmptyState";
import { ReadFromFileLoadingState } from "./ReadFromFileLoadingState";

export interface ReadFromFileProps {
	boardTemplate: IBoardTemplate;
	onUpdateValues: (grid: IBoard["values"]) => void;
}

export function ReadFromFile({
	boardTemplate,
	onUpdateValues,
}: ReadFromFileProps) {
	const { lang } = useAdapters();

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
					boardTemplate={boardTemplate}
					values={readBoardFromFile.data.values}
					onUpdateValues={onUpdateValues}
					reset={reset}
				/>
			) : readBoardFromFile.isError ? (
				<QueryError
					error={readBoardFromFile.error}
					msg={lang.get(ILanguageAdapterKey.READ_FROM_FILE_MUTATION_ERROR_MSG)}
					retry={retry}
					where="ReadFromFile.readBoardFromFile.isError"
				/>
			) : (
				<ReadFromFileLoadingState />
			)}
		</Flex>
	);
}
