import { useMemo } from "react";
import type { IDateAdapter } from "@/shared/adapters/date/domain";

export function createDateAdapter(): IDateAdapter {
	const dateFormatter = new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
	});

	const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	});

	return {
		formatDate(args) {
			switch (args.type) {
				case "utc-ms":
					return dateFormatter.format(new Date(args.value));
			}
		},

		formatDateTime(args) {
			switch (args.type) {
				case "utc-ms":
					return dateTimeFormatter.format(new Date(args.value));
			}
		},
	};
}

export function useDateAdapter(): IDateAdapter {
	return useMemo(() => createDateAdapter(), []);
}
