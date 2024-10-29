import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services";
import TestEZ from "@rbxts/testez";

TestEZ.TestBootstrap.run(
	[Players.LocalPlayer.WaitForChild("PlayerScripts").WaitForChild("client").WaitForChild("tests")],
	TestEZ.Reporters.TextReporter,
);
