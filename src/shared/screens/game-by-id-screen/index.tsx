import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SuspenseLoader } from "@/shared/components";
import { genRoute, RouteName } from "@/shared/router/app";

export default function GameByIdScreen() {
	return <GameByIdScreenController GameById={() => null} />;
}

interface GameByIdScreenController {
	GameById: React.ComponentType<{
		id: string;
	}>;
}

export function GameByIdScreenController({
	GameById,
}: GameByIdScreenController) {
	const { id } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		if (!id) {
			nav(genRoute({ name: RouteName.HOME }));
		}
	}, [id, nav]);

	return id ? <GameById id={id} /> : <SuspenseLoader />;
}
