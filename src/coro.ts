import { Clone, Make } from "@rbxts/altmake";
import { RECEIVE_MESSAGE_TOPIC, SEND_MESSAGE_TOPIC } from "./constants/topics";
import { TIMEOUT } from "./constants/core";
import { BindToCustomMessage } from "./utils/bind-to-custom-message";

export class Coro {
	private actorPool = new Array<Actor>();
	private actorPoolId = 0;

	constructor(
		private actorTemplate: Actor,
		private module: ModuleScript,
	) {}

	Spawn(...args: unknown[]) {
		const actor = this.nextActor();
		this.actorPoolId += 1;

		actor.SetAttribute("id", this.actorPoolId);
		actor.Processor.Enabled = true;

		const promise = new Promise((resolve, reject) => {
			const connection = BindToCustomMessage(RECEIVE_MESSAGE_TOPIC + this.actorPoolId, (result: unknown) => {
				connection.Disconnect();
				resolve(result);
			});

			task.delay(TIMEOUT, () => {
				connection.Disconnect();
				reject(undefined);
			});
		});

		task.defer(() => actor.SendMessage(SEND_MESSAGE_TOPIC + this.actorPoolId, this.module, ...args));

		return promise;
	}

	private nextActor() {
		return (this.actorPool.unorderedRemove(0) ??
			Clone(this.actorTemplate, {
				Parent: this.actorTemplate.Parent,
			})) as Actor & { Processor: BaseScript };
	}
}
