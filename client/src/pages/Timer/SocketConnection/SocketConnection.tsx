import {
  Accordion,
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import {
  SocketContext,
  useSocketContext,
} from "../../../context/SocketContext";
import { IconLink } from "@tabler/icons-react";
import classes from "./SocketConnection.module.css";
import { User } from "../../../classes/models";
import { useAuth0 } from "@auth0/auth0-react";

/* interface ConnectionProp {
  connection: User
}
function Connection({ connection }: ConnectionProp) {
  return (
    <Text
    >
      {`${connection.displayName} is ${connection.runningTime.name || "taking a break"}`}
    </Text>
  )
} */

interface UserLabelProps {
  user: User;
}
function UserLabel({ user }: UserLabelProps) {
  return (
    <Group wrap="nowrap">
      <Text>{user.displayName}</Text>
    </Group>
  );
}

interface UserListProps {
  users: User[];
}
function UserList({ users }: UserListProps) {
  const items = users.map((user) => (
    <Accordion.Item key={user.id} value={user.displayName}>
      <Accordion.Control>
        <UserLabel user={user} />
      </Accordion.Control>
      <Accordion.Panel>{user.runningTime.name}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Accordion variant="filled" radius={"md"}>
        {items}
      </Accordion>
    </>
  );
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

    socket.on("users", updateUsers);

    return () => {
      socket.off("users");
    };
  }, []);

  function socketConnect() {
    if (joined) {
      socket.emit("leave");
      setJoined(false);
      return;
    }

    socket.emit("join");
    setJoined(true);
  }

  return (
    <Stack className={classes.section}>
      <Text className={classes.header}> Study Room </Text>
      <Button
        onClick={socketConnect}
        leftSection={<IconLink />}
        className={classes.linkButton}
      >
        {joined ? "Leave the room!" : "Connect to the room!"}
      </Button>
      <UserList users={users} />
    </Stack>
  );
}

export default SocketConnection;
