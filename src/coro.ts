import { Clone } from "@rbxts/altmake";
import { RECEIVE_MESSAGE_TOPIC, SEND_MESSAGE_TOPIC } from "./constants/topics";
import { BindToCustomMessage } from "./utils/bind-to-custom-message";

type ProcessorActor = Actor & { Processor: BaseScript };

export class Coro {
	private actorPool = new Array<Actor>();
	private actorPoolId = 0;

	constructor(
		private actorTemplate: ProcessorActor,
		private module: ModuleScript,
	) {}

	public Spawn(...args: unknown[]) {
		const actor = this.nextActor();
		this.actorPoolId += 1;

		const id = this.actorPoolId;

		actor.SetAttribute("id", id);
		actor.Processor.Enabled = true;

		const promise = new Promise((resolve) => {
			const connection = BindToCustomMessage(RECEIVE_MESSAGE_TOPIC + id, (result: unknown) => {
				connection.Disconnect();
				resolve(result);
				this.Return(actor);
			});
		});

		task.defer(() => actor.SendMessage(SEND_MESSAGE_TOPIC + id, this.module, ...args));

		return promise;
	}

	public Return(actor: ProcessorActor) {
		actor.Processor.Enabled = false;
		actor.SetAttribute("id", undefined);
		this.actorPool.push(actor);
	}

	public Destroy() {
		for (const actor of this.actorPool) {
			actor.Destroy();
		}
		this.actorPool.clear();
	}

	private nextActor() {
		return (this.actorPool.unorderedRemove(0) ??
			Clone(this.actorTemplate, {
				Parent: this.actorTemplate.Parent,
			})) as ProcessorActor;
	}
}
