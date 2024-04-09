import { ActionIcon, Button, Stack, Text } from "@mantine/core"
import { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"
import { SocketContext, useSocketContext } from "../../../context/SocketContext";
import { IconLink } from "@tabler/icons-react";
import classes from "./SocketConnection.module.css";

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
        <Stack className={classes.section}>
            <Text className={classes.header}>Connect</Text>
            <Button 
                onClick={connectToWebsocket}
                leftSection={<IconLink />}
                className={classes.linkButton}
            >
                Click me to connect!
            </Button>
            <Text>{text}</Text>
        </Stack>
    )
}

export default SocketConnection