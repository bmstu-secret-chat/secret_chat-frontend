export const useKeyDrawer = (setOpen: (open: boolean) => void) => {
	const onClose = () => {
		setOpen(false);
	};

	return { onClose };
};
