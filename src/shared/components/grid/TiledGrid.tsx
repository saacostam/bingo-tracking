import { useEffect, useRef } from "react";

export type GetFillStyle = (i: number, j: number) => string;

export interface TiledGridProps {
	getFillStyle: GetFillStyle;
	gridDimensions: {
		height: number;
		width: number;
	};
}

const CELL_GAP = 2;
const CELL_RADIUS = 2;

export function TiledGrid({ getFillStyle, gridDimensions }: TiledGridProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;

		if (!container || !canvas) return;

		const resizeObserver = new ResizeObserver(() => {
			const { width, height } = container.getBoundingClientRect();

			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			renderTiledGrid({
				ctx,
				getFillStyle,
				gridDimensions,
			});
		});

		resizeObserver.observe(container);

		return () => resizeObserver.disconnect();
	}, [getFillStyle, gridDimensions]);

	return (
		<div
			ref={containerRef}
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					display: "block",
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
}

export function renderTiledGrid(
	args: TiledGridProps & {
		ctx: CanvasRenderingContext2D;
	},
) {
	const { ctx, getFillStyle, gridDimensions } = args;

	const { canvas } = ctx;

	const cellWidth = canvas.width / gridDimensions.width;
	const cellHeight = canvas.height / gridDimensions.height;

	for (let i = 0; i < gridDimensions.height; i++) {
		for (let j = 0; j < gridDimensions.width; j++) {
			ctx.fillStyle = getFillStyle(i, j);

			const x = cellWidth * j + CELL_GAP / 2;
			const y = cellHeight * i + CELL_GAP / 2;

			const width = cellWidth - CELL_GAP;
			const height = cellHeight - CELL_GAP;

			ctx.beginPath();
			ctx.roundRect(x, y, width, height, CELL_RADIUS);
			ctx.fill();
		}
	}
}
