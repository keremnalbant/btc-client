/* This pattern (Event Bus) is not that necessary in this type of project,
but it is a good example of how to use the EventEmitter in React/TypeScript.

The idea is to create a global event emitter that can be used to subscribe
and publish events across the application. This is useful when you have
components that are not directly related to each other, but you still need
to communicate between them.

For example, you can use this to communicate between a component and a service
that is not directly related to it.

For Microfrontends, instead of using node's EventEmitter, you can use CustomEvent,
and listen by window.addEventListener and dispatch by window.dispatchEvent

Error handling may be necessary in some cases, but it is not implemented here.
*/

//TODO: remove this file in future

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
