import { ActionIcon, Text } from "@mantine/core"
import { useState } from "react";
import { io } from "socket.io-client"

function SocketConnection() {
    const [text, setText] = useState("");
    const URL = import.meta.env.VITE_API_SERVER_URL || 'http:///localhost:3000'

    const socket = io(URL, {
        query: {
            token: "nemLmP1npemf5VSzAKRC"
        }
    });

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