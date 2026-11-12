import { Divider, Title } from "@mantine/core";
import { Demo } from "@/features/landing/demo/ui";
import { Summary } from "@/features/landing/summary/ui";
import { Login } from "@/features/login/ui";

export default function LandingScreen() {
	return (
		<>
			<Login />
			<Divider my="xl" />
			<Title mb="xl" size="xl" ta="center">
				Demo
			</Title>
			<Demo />
			<Divider my="xl" />
			<Summary />
		</>
	);
}
