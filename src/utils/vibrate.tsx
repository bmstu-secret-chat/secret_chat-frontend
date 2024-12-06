const vibrate = (pattern: number) => {
	return window.navigator.vibrate(pattern);
};

export default vibrate;
