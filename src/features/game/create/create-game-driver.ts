import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { Driver } from "@/tests/driver";

const createGameSelector = {};

class CreateGameDriver extends Driver<typeof createGameSelector> {
	constructor() {
		super(createGameSelector);
	}

	async fill(args: { name: string }) {
		const nameField = screen.getByRole("textbox", { name: /name/i });
		fireEvent.change(nameField, {
			target: {
				value: args.name,
			},
		});
	}

	async submit() {
		const submitButton = screen.getByRole("button", { name: /create/i });
		return userEvent.click(submitButton);
	}
}

export const createGameDriver = new CreateGameDriver();
