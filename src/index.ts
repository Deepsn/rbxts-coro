import { ServerScriptService, StarterPlayer } from "@rbxts/services";
import { IS_SERVER } from "./constants/core";
import { Coro } from "./coro";
import { findByTree, type Tree } from "./utils/find-by-tree";
import { Clone, Make } from "@rbxts/altmake";

const processorParent = IS_SERVER ? ServerScriptService : StarterPlayer.WaitForChild("StarterPlayerScripts");
const processors = script.WaitForChild("processors") as Folder;
const processorTemplate = processors.WaitForChild(`processor-${IS_SERVER ? "server" : "client"}`) as BaseScript;

export function CreateCoro(tree: Tree) {
	const module = findByTree(tree);

	const actor = Make("Actor", {
		Name: `CoroActor-${module.Name}`,
		Children: Clone(processorTemplate, { Name: "Processor" }),
		Parent: processorParent,
	});

	return new Coro(actor, module);
}
