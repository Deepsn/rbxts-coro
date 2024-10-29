export type Tree = [Instance, string[]];

export function findByTree(module: Tree) {
	const [root, parts] = module;
	let instance = root;

	for (const part of parts) {
		instance = (
			instance as {
				// biome-ignore lint/suspicious/noExplicitAny:
				[key: string]: any;
			}
		)[part];
	}

	return instance as ModuleScript;
}
