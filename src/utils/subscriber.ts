/* Actually this pattern (event bus) is not that necessary,
but it is a good example of how to use the event emitter in typescript.
*/

import { EventEmitter } from 'events';
import { EventName } from '../models';

const eventEmitter = new EventEmitter();

export function removeEvent(
  eventName: EventName,
  callback: (...args: any[]) => void,
) {
  eventEmitter.removeListener(eventName, callback);
}

export function subscribeEvent(
  eventName: EventName,
  callback: (...args: any[]) => void,
) {
  eventEmitter.addListener(eventName, callback);
}

export function onceEvent(
  eventName: EventName,
  callback: (...args: any[]) => void,
) {
  eventEmitter.once(eventName, callback);
}

export function publishEvent(eventName: EventName, ...args: any[]) {
  eventEmitter.emit(eventName, args);
}
