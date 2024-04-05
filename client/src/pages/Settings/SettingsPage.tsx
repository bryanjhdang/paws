import { useState } from "react";
import { Avatar, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { SimpleHeader } from "../../components/Headers";
import { ThemeSettings, PetSettings, NotificationSettings, AccountSettings } from "./SettingsOptions"
import { useAuth0 } from "@auth0/auth0-react";

function ProfileDisplay() {
  const { user } = useAuth0();
  if (!user) return null;

  return (
    <Group p={30}>
      <Avatar src={user.picture} size="xxl" />
      <Stack ml={30} gap="xs" flex={1}>
        <Text fw={500}>Personal Details</Text>
        <Divider />
        <Text>NAME: {user.name}</Text>
        <Text>EMAIL: {user.email}</Text>
      </Stack>
    </Group>
  )
}

function SettingsPage() {
  const [active, setActive] = useState('Settings');

  return (
    <Flex direction={'row'} gap={30}>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack flex={1}>
        <SimpleHeader text="Settings" />
        <Stack mx="lg">
          <ProfileDisplay />
          {/* <ThemeSettings /> */}
          {/* <NotificationSettings /> */}
          <PetSettings />
          <AccountSettings />
        </Stack>
      </Stack>
    </Flex>
  )
}

export default SettingsPage