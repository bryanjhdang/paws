import { ActionIcon, Text } from "@mantine/core"
import { useContext, useState } from "react";
import { Socket, io } from "socket.io-client"
import { SocketContext, useSocketContext } from "../../context/SocketContext";

function SocketConnection() {
    const socket : Socket = useSocketContext();

    const [text, setText] = useState("");


    socket.on('users', (data) => {
        console.log(data);
        // setText(data);
    })


    function connectToWebsocket() {
        try {
            console.log(`Connected to websocket on ${URL}`)
            socket.emit("join")
        } catch (err) {
            console.log(`Unable to connect to socket at ${URL}, ${err}`)
        }
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