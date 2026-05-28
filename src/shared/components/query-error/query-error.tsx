import { Alert, Button, Flex } from "@mantine/core";
import { useEffect } from "react";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import type { IRetry } from "@/shared/async-state";
import { ExclamationCircleIcon } from "@/shared/icons";

export interface QueryErrorProps {
	msg: string;
	retry: IRetry;
	title?: string;
	error: unknown;
	where: string;
}

export function QueryError({
	msg,
	retry,
	title: _title,
	error,
	where,
}: QueryErrorProps) {
	const { errorMonitoringAdapter, lang } = useAdapters();

	const title =
		_title ?? lang.get(ILanguageAdapterKey.QUERY_ERROR_DEFAULT_TITLE);

	useEffect(() => {
		errorMonitoringAdapter.report(error, { where });
	}, [error, errorMonitoringAdapter, where]);

	return (
		<Alert color="red" icon={<ExclamationCircleIcon />} title={title}>
			{msg}
			<Flex justify="end">
				<Button color="red" loading={retry.isPending} onClick={retry.onClick}>
					Retry
				</Button>
			</Flex>
		</Alert>
	);
}
