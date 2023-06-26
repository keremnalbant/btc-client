import { EventEmitter } from "events";
import { EventName } from "../models";

const eventEmitter = new EventEmitter();

export function removeEvent(
  type: EventName,
  callback: (...args: any[]) => void,
) {
  eventEmitter.removeListener(type, callback);
}

export function subscribeEvent(
  type: EventName,
  callback: (...args: any[]) => void,
) {
  eventEmitter.addListener(type, callback);
}

export function onceEvent(type: EventName, callback: (...args: any[]) => void) {
  eventEmitter.once(type, callback);
}

export function publishEvent(type: EventName, ...args: any[]) {
  eventEmitter.emit(type, args);
}
