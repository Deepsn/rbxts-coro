export = () => {
	for (let i = 0; i < 10000000; i++) {
		const x = i * i;
	}
	return os.clock();
};
