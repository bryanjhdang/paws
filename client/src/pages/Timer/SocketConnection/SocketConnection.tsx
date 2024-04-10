import { ActionIcon, Button, Stack, Text } from "@mantine/core"
import { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"
import { SocketContext, useSocketContext } from "../../../context/SocketContext";
import { IconLink } from "@tabler/icons-react";
import classes from "./SocketConnection.module.css";
import { User } from "../../../classes/models";
import { useAuth0 } from "@auth0/auth0-react";

interface ConnectionProp {
  connection: User
}
function Connection({ connection }: ConnectionProp) {
  return (
    <Text
    >
      {`${connection.displayName} is ${connection.runningTime.name || "taking a break"}`}
    </Text>
  )
}

function SocketConnection() {
  const socket: Socket = useSocketContext();

  const [joined, setJoined] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);

  const { user } = useAuth0();



  useEffect(() => {
    function updateUsers(data: User[]) {
      setUsers(data.filter((e) => e.id != user?.sub));
    }

    socket.on('users', updateUsers);

    return () => {
      socket.off('users'); 
    }
  }, []);

  function socketConnect() {
    if (joined) {
      socket.emit("leave");
      setJoined(false);
      return;
    }

    socket.emit("join")
    setJoined(true);
  }

  return (
    <Stack className={classes.section}>
      <Text className={classes.header}> Room </Text>
      return
      <Button
        onClick={socketConnect}
        leftSection={<IconLink />}
        className={classes.linkButton}
      >
        {joined ? "Leave the room!" : "Connect to the room!"}
      </Button>
      {
        users.map((user) => (
          <Connection
            key={user.id}
            connection={user}
          />
        ))
      }
    </Stack>
  )
}

export default SocketConnection