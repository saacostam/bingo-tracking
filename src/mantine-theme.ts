export const theme = {
	primaryColor: "indigo",
	components: {
		Modal: {
			defaultProps: {
				closeButtonProps: {
					"data-testid": "modal-close-button",
				},
				"data-testid": "modal",
				transitionProps: {
					duration: 0,
				},
				styles: {
					title: {
						fontWeight: "bold",
						fontSize: "1.2rem",
					},
				},
			},
		},
	},
};
