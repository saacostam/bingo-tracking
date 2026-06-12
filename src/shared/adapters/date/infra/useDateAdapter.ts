import { useCallback, useMemo } from "react";
import type { IDateAdapter } from "@/shared/adapters/date/domain";

export function useDateAdapter(): IDateAdapter {
	const formatDate: IDateAdapter["formatDate"] = useCallback((args) => {
		switch (args.type) {
			case "utc-ms": {
				const date = new Date(args.value);

				const year = date.getUTCFullYear();
				const month = String(date.getUTCMonth() + 1).padStart(2, "0");
				const day = String(date.getUTCDate()).padStart(2, "0");

				return `${year}-${month}-${day}`;
			}
		}
	}, []);

	return useMemo(
		() => ({
			formatDate,
		}),
		[formatDate],
	);
}
