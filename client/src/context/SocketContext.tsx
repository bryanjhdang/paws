import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

export function useSocketContext() {
    const socket = useContext(SocketContext);

    if (socket === undefined) {
        throw new Error("use SocketContext must be used with a SocketContext");
    }

    return socket;
}