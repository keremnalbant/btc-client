import { EventName, ISocketService } from "../models";
import { getToken } from "./localStorageHelper";
import { publishEvent } from "./subscriber";

const { io } = await import("socket.io-client");

export default class SocketService implements ISocketService {
  private static socketService: ISocketService | null;
  // had issues on CommonJS imports that's why I kept it any
  private socket: any | null;

  constructor() {
    const socket = io(process.env.REACT_APP_BASE_URL as string, {
      path: process.env.REACT_APP_SOCKET_PATH,
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    this.socket = socket;
  }

  // onAny does not trigger connect and disconnect events, we subscribe manually
  private subscribeConnected = () => {
    this.socket?.on(EventName.Connect, () => {
      publishEvent(EventName.Connect, this.socket?.id);
    });
  };

  private subscribeDisconnected = () => {
    this.socket?.on(EventName.Disconnect, () => {
      publishEvent(EventName.Disconnect, this.socket?.id);
    });
  };

  private listener = (eventName: EventName, ...args: any) => {
    const key =
      Object.keys(EventName)[Object.values(EventName).indexOf(eventName)];
    if (EventName[key as keyof typeof EventName]) publishEvent(eventName, args);
  };

  emit = (event: EventName, data: any) => {
    this.socket?.emit(event, data);
  };

  onAny = () => {
    this.socket?.onAny(this.listener);
    this.subscribeConnected();
    this.subscribeDisconnected();
  };

  static getSocketService(): ISocketService {
    if (!this.socketService) this.socketService = new SocketService();
    return this.socketService;
  }
}
