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

	it("should have similar timings", () => {
		const coro = CreateCoro($getModuleTree("../modules/processing"));
		const coro2 = CreateCoro($getModuleTree("../modules/processing"));

		const [, results] = Promise.all([coro.Spawn(), coro2.Spawn()]).await();
		const [t1, t2] = results as [number, number];

		// t1 should be pretty close to t2, but depending on the system it might be off by a bit
		expect(t1).to.be.near(t2, 0.5);
	});
};
