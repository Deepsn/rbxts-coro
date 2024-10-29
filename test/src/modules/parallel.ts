import { RunService } from "@rbxts/services";

export = () => {
	let t = 0;
	task.synchronize();
	const connection = RunService.Heartbeat.ConnectParallel(() => {
		t++;
	});

	task.wait(1);
	connection.Disconnect();
	task.desynchronize();
	return t;
};
