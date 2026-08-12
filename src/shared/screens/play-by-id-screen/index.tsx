import { type ComponentType, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PlayById, type PlayByIdProps } from "@/features/play/by-id/ui";
import { SuspenseLoader } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

export default function PlayByIdScreen() {
	return <PlayByIdScreenController PlayById={PlayById} />;
}

export function PlayByIdScreenController(props: {
	PlayById: ComponentType<PlayByIdProps>;
}) {
	const { id } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		if (!id) {
			nav(genRoute({ name: RouteName.HOME }));
		}
	}, [id, nav]);

	if (!id) return <SuspenseLoader />;

	return <props.PlayById playId={id} />;
}
