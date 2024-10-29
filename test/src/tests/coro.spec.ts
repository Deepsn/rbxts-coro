/// <reference types="@rbxts/testez/globals" />

import { CreateCoro } from "@rbxts/coro";

export = () => {
	it("should run a test module", () => {
		const coro = CreateCoro($getModuleTree("../modules/hello-world"));
		const [, result] = coro.Spawn().await();

		expect(result).to.equal("hello world");
	});

	it("should run on a parallel thread", () => {
		const coro = CreateCoro($getModuleTree("../modules/parallel"));
		const [, result] = coro.Spawn().await();

		expect(result).to.be.ok();
		expect((result as number) > 0).to.equal(true);
	});
};
