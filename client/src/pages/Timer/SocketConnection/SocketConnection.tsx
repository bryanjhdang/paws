import { Accordion, Image, Button, Group, Stack, Text } from "@mantine/core";

import { useEffect, useState } from "react";

import { Socket } from "socket.io-client";
import {
  useSocketContext,
} from "../../../context/SocketContext";
import {
  IconLink,
  IconCircleFilled,
} from "@tabler/icons-react";
import classes from "./SocketConnection.module.css";
import { User } from "../../../classes/models";
import { getPathById } from "../../../classes/shopItems";
import { useAuth0 } from "@auth0/auth0-react";

interface UserLabelProps {
  user: User;
}
function UserLabel({ user }: UserLabelProps) {
  return (
    <Group wrap="nowrap">
      {user.runningTime.startTime === undefined ? (
        <IconCircleFilled color="orange" size={12} />
      ) : (
        <IconCircleFilled color="green" size={12} />
      )}
      <Text>{user.displayName}</Text>
    </Group>
  );
}

interface UserListProps {
  users: User[];
}
function UserList({ users }: UserListProps) {
  const items = users.map((user) => (
    <Accordion.Item
      key={user.id}
      value={user.displayName}
      bg={user.runningTime.startTime == undefined ? "grey" : "white"}
      mt={10}
    >
      <Accordion.Control>
        <UserLabel user={user} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text>
          {user.runningTime.startTime == undefined
            ? "Idling..."
            : `Working on: ${user.runningTime.name}`}
        </Text>

        <Image
          src={
            user.runningTime.startTime == undefined
              ? getPathById(true, user.pet.restId)
              : getPathById(false, user.pet.workId)
          }
          height={160}
          radius={"md"}
          mt={10}
        />
      </Accordion.Panel>
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
      setUsers([]);
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
        color="#f5ad14"
      >
        {joined ? "Leave the room!" : "Connect to the room!"}
      </Button>
      <UserList users={users} />
    </Stack>
  );
}

export default SocketConnection;
