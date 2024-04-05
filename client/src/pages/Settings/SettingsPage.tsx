import { useState } from "react";
import { Avatar, Divider, Flex, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { TextHeader } from "../../components/Headers";
import { PetSettings, NotificationSettings, AccountSettings } from "./SettingsOptions"
import { useAuth0 } from "@auth0/auth0-react";
import classes from "./SettingsPage.module.css";

function ProfileDisplay() {
  const { user } = useAuth0();
  if (!user) return null;

  return (
    <Group className={classes.profile}>
      <Avatar src={user.picture} size="xxl" />
      <Stack ml={30} gap="xs" flex={1}>
        <Text className={classes.profileHeading}>Profile Info</Text>
        <Text>Name {user.name}</Text>
        <Text>Email {user.email}</Text>
      </Stack>
    </Group>
  )
}

function SettingsPage() {
  const [active, setActive] = useState('Settings');

  return (
    <Flex direction={'row'} flex={1} gap={50}>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack flex={1}>
        <TextHeader text="Settings" />
        <ProfileDisplay />
        <NotificationSettings />
        <PetSettings />
        <AccountSettings />
      </Stack>
    </Flex>
  )
}

export default SettingsPage