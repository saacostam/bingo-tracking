import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { type GetFillStyle, renderTiledGrid, TiledGrid } from "./TiledGrid";

describe("renderTiledGrid", () => {
	it("renders every grid cell with the expected dimensions and position", () => {
		const roundRect = vi.fn();
		const fill = vi.fn();

		const ctx = {
			canvas: {
				width: 100,
				height: 60,
			},
			fillStyle: "",
			beginPath: vi.fn(),
			roundRect,
			fill,
		} as unknown as CanvasRenderingContext2D;

		const getFillStyle: GetFillStyle = vi.fn(() => "red");

		renderTiledGrid({
			ctx,
			getFillStyle,
			gridDimensions: {
				width: 2,
				height: 2,
			},
		});

		expect(getFillStyle).toHaveBeenCalledTimes(4);

		expect(roundRect).toHaveBeenNthCalledWith(1, 1, 1, 48, 28, 2);
		expect(roundRect).toHaveBeenNthCalledWith(2, 51, 1, 48, 28, 2);
		expect(roundRect).toHaveBeenNthCalledWith(3, 1, 31, 48, 28, 2);
		expect(roundRect).toHaveBeenNthCalledWith(4, 51, 31, 48, 28, 2);

		expect(fill).toHaveBeenCalledTimes(4);
	});

	it("uses the fill style returned for each cell", () => {
		const ctx = {
			canvas: {
				width: 100,
				height: 100,
			},
			fillStyle: "",
			beginPath: vi.fn(),
			roundRect: vi.fn(),
			fill: vi.fn(),
		} as unknown as CanvasRenderingContext2D;

		const getFillStyle: GetFillStyle = vi
			.fn()
			.mockReturnValueOnce("red")
			.mockReturnValueOnce("blue")
			.mockReturnValueOnce("green")
			.mockReturnValueOnce("yellow");

		renderTiledGrid({
			ctx,
			getFillStyle,
			gridDimensions: {
				width: 2,
				height: 2,
			},
		});

		expect(getFillStyle).toHaveBeenNthCalledWith(1, 0, 0);
		expect(getFillStyle).toHaveBeenNthCalledWith(2, 0, 1);
		expect(getFillStyle).toHaveBeenNthCalledWith(3, 1, 0);
		expect(getFillStyle).toHaveBeenNthCalledWith(4, 1, 1);

		expect(ctx.fillStyle).toBe("yellow");
	});
});

describe("TiledGrid", () => {
	it("renders a canvas inside its container", () => {
		const { container } = render(
			<TiledGrid
				getFillStyle={() => "red"}
				gridDimensions={{
					width: 2,
					height: 2,
				}}
			/>,
		);

		expect(container.querySelector("canvas")).toBeInTheDocument();
	});

	it("observes the container size and renders the canvas at that size", () => {
		const observe = vi.fn();
		const disconnect = vi.fn();

		let resizeCallback: ResizeObserverCallback | undefined;

		vi.stubGlobal(
			"ResizeObserver",
			class {
				constructor(callback: ResizeObserverCallback) {
					resizeCallback = callback;
				}

				observe = observe;
				disconnect = disconnect;
			},
		);

		const getContext = vi.fn();

		HTMLCanvasElement.prototype.getContext = getContext;

		const beginPath = vi.fn();
		const roundRect = vi.fn();
		const fill = vi.fn();

		getContext.mockReturnValue({
			canvas: {
				width: 200,
				height: 100,
			},
			fillStyle: "",
			beginPath,
			roundRect,
			fill,
		});

		const { container } = render(
			<TiledGrid
				getFillStyle={() => "red"}
				gridDimensions={{
					width: 2,
					height: 1,
				}}
			/>,
		);

		const wrapper = container.firstElementChild as HTMLDivElement;
		const canvas = container.querySelector("canvas");

		if (!canvas) throw new Error("No Canvas");

		vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
			width: 200,
			height: 100,
			top: 0,
			left: 0,
			right: 200,
			bottom: 100,
			x: 0,
			y: 0,
			toJSON: () => {},
		});

		resizeCallback?.([], {} as ResizeObserver);

		expect(observe).toHaveBeenCalledWith(wrapper);

		expect(canvas.width).toBe(200);
		expect(canvas.height).toBe(100);

		expect(roundRect).toHaveBeenCalledTimes(2);
		expect(fill).toHaveBeenCalledTimes(2);
		expect(disconnect).not.toHaveBeenCalled();
	});

	it("disconnects the ResizeObserver on unmount", () => {
		const disconnect = vi.fn();

		vi.stubGlobal(
			"ResizeObserver",
			class {
				observe = vi.fn();
				disconnect = disconnect;
			},
		);

		const { unmount } = render(
			<TiledGrid
				getFillStyle={() => "red"}
				gridDimensions={{
					width: 2,
					height: 2,
				}}
			/>,
		);

		unmount();

		expect(disconnect).toHaveBeenCalledTimes(1);
	});
});
