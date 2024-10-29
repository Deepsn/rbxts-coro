import type { RECEIVE_MESSAGE_TOPIC, SEND_MESSAGE_TOPIC } from "../constants/topics";
import { ReplicatedStorage, RunService } from "@rbxts/services";

// Hardcoded because of roblox-ts's limitation
const receiveMessageTopic = "RECEIVE_MESSAGE" satisfies typeof RECEIVE_MESSAGE_TOPIC;
const sendMessageTopic = "SEND_MESSAGE" satisfies typeof SEND_MESSAGE_TOPIC;

const actor = script.GetActor();
assert(actor, "Processor must be a child of an actor");

const messengerKey = `CoroMessenger-${RunService.IsServer() ? "Server" : "Client"}`;
const messenger = ReplicatedStorage.WaitForChild(messengerKey) as BindableEvent;

const id = actor.GetAttribute("id");

actor.BindToMessage(sendMessageTopic + id, (module: ModuleScript, ...args: unknown[]) => {
	const execute = require(module) as (...args: unknown[]) => unknown;

	task.desynchronize();

	const result = execute(...args);

	task.synchronize();

	messenger.Fire(receiveMessageTopic + id, result);
});
