import { Make } from "@rbxts/altmake";
import { ReplicatedStorage } from "@rbxts/services";
import { IS_SERVER } from "../constants/core";

const messengerKey = `CoroMessenger-${IS_SERVER ? "Server" : "Client"}`;
const messenger = (ReplicatedStorage.FindFirstChild(messengerKey) ??
	Make("BindableEvent", {
		Name: messengerKey,
		Parent: ReplicatedStorage,
	})) as BindableEvent;

export function BindToCustomMessage(topic: string, callback: (...args: unknown[]) => void) {
	return messenger.Event.Connect((topicReceived: string, ...args: unknown[]) => {
		if (topicReceived !== topic) return;
		callback(...args);
	});
}

export function SendCustomMessage(topic: string, ...args: unknown[]) {
	messenger.Fire(topic, ...args);
}
