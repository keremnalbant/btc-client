import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSubscriber } from "../hooks/useSubscriber";
import { EventName, ISocketService } from "../models";
import SocketService from "../utils/socket";
import { useAuth } from "./AuthContext";

export type SocketServiceType = {
  socketService: ISocketService | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketServiceType>(null!);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth();
  const [socketService, setSocketService] = useState<ISocketService | null>(
    null,
  );
  const [isConnected, setIsConnected] = useSubscriber(
    EventName.Connect,
    false,
    (e: any, prev: any) => {
      toast.success("Connected to the server!");
      return e[0];
    },
  );

  useSubscriber(EventName.Disconnect, undefined, (e: any, prev: any) => {
    setIsConnected(false);
    toast.error("Disconnected from the server!");
  });

  useEffect(() => {
    if (userData && !socketService) {
      const socket = SocketService.getSocketService();
      socket.onAny();
      setSocketService(socket);
    }
  }, [userData, socketService]);

  const value: SocketServiceType = { socketService, isConnected };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const useSocket = (): SocketServiceType => {
  return useContext<SocketServiceType>(SocketContext);
};

export { SocketProvider, useSocket };

