import { useCallback, useMemo, useState } from "react";

type Modal =
	| {
			type: "none";
	  }
	| {
			type: "update-patterns";
	  };

export function usePlayByIdModals() {
	const [status, setStatus] = useState<Modal>({
		type: "none",
	});

	const close = useCallback(() => {
		setStatus({
			type: "none",
		});
	}, []);

	const openUpdatePatterns = useCallback(() => {
		setStatus({
			type: "update-patterns",
		});
	}, []);

	return useMemo(
		() => ({
			close,
			modal: status,
			openUpdatePatterns,
		}),
		[close, status, openUpdatePatterns],
	);
}
