import { EventName } from '.';

export interface ISocketService {
  emit: (event: EventName, data: any) => void;
  onAny: () => void;
}
