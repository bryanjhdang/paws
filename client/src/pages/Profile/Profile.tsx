import { useState } from "react";
import { Flex, Avatar, Stack, Group, Text, Divider } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { useAuth0 } from "@auth0/auth0-react";
import { SimpleHeader } from "../../components/Headers";
import { AccountSettings } from "./ProfileOptions";

function ProfileDisplay() {
  const { user } = useAuth0();
  if (!user) return null;

  return (
    <Group p={30}>
      <Avatar src={user.picture} size="xxl" />
      <Stack ml={30} gap="xs" style={{ flex: 1 }}>
        <Text fw={500}>Personal Details</Text>
        <Divider />
        <Text>NAME: {user.name}</Text>
        <Text>EMAIL: {user.email}</Text>
      </Stack>
    </Group>
  )
}

function ProfilePage() {
  const [active, setActive] = useState("Profile");

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack style={{ flex: 1 }}>
        <SimpleHeader text="Profile" />
        <Stack mx="lg">
          <ProfileDisplay />
          <AccountSettings />
          {/* Uncomment this to see all the fields that are avaiable from the user variable */}
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ProfilePage;
