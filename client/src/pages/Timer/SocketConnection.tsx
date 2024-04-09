import { ActionIcon, Text } from "@mantine/core"
import { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"
import { SocketContext, useSocketContext } from "../../context/SocketContext";

function SocketConnection() {
    const socket: Socket = useSocketContext();

    const [text, setText] = useState("");


    useEffect(() => {
        socket.on('users', (data) => {
            console.log(data);
            
        });

       return () => {
        socket.off("users");
       } 
    });



    function connectToWebsocket() {
        socket.emit("join")
    }

    return (
        <>
            <ActionIcon
                onClick={connectToWebsocket}
            >Click Me to Connect!
            </ActionIcon>
            <Text
            >{text}</Text>
        </>
    )
}

export default SocketConnection