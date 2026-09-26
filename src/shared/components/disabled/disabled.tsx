import { Alert } from "@mantine/core";
import { useEffect } from "react";
import { useAdapters } from "@/shared/adapters/core/app";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { ExclamationCircleIcon } from "@/shared/icons";

export interface DisabledProps {
	msg: string;
	title?: string;
	where: string;
}

export function Disabled({ msg, title: _title, where }: DisabledProps) {
	const { errorMonitoringAdapter } = useAdapters();

	const title = _title ?? "Feature Unavailable";

	useEffect(() => {
		const error = new DomainError({
			type: DomainErrorType.UNKNOWN,
			userMsg: "User go to disabled state",
			msg: `User reached disabled state in: ${where}`,
		});

		errorMonitoringAdapter.report(error, { where });
	}, [errorMonitoringAdapter, where]);

	return (
		<Alert
			data-testid="query-error"
			icon={<ExclamationCircleIcon />}
			title={title}
		>
			{msg}
		</Alert>
	);
}
