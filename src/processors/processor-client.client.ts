import { RECEIVE_MESSAGE_TOPIC, SEND_MESSAGE_TOPIC } from "../constants/topics";
import { SendCustomMessage } from "../utils/bind-to-custom-message";

const actor = script.GetActor();
assert(actor, "Processor must be a child of an actor");

const id = actor.GetAttribute("id");

actor.BindToMessage(SEND_MESSAGE_TOPIC + id, (module: ModuleScript, ...args: unknown[]) => {
	const execute = require(module) as (...args: unknown[]) => unknown;

	task.desynchronize();

	const result = execute(...args);

	task.synchronize();

	SendCustomMessage(RECEIVE_MESSAGE_TOPIC + id, result);
});
