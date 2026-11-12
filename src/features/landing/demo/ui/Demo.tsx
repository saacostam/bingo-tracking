import { AspectRatio } from "@mantine/core";

const style = {
	width: "100%",
	height: "100%",
	border: 0,
};

export function Demo() {
	return (
		<AspectRatio ratio={16 / 9}>
			<iframe
				src="https://www.youtube.com/embed/u7h1mzfn2ZY"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				style={style}
			/>
		</AspectRatio>
	);
}
