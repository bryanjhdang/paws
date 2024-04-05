import { Card, Text, Button, Switch, Group, Stack } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import classes from "./SettingsOptions.module.css";

export function NotificationSettings() {
  return (
    <Stack className={classes.section}>
      <Text className={classes.title}>Sound and Notifications</Text>
      <Group>
        <Switch color="yellow" />
        <Text>Play sound when timer ends</Text>
      </Group>
      <Group>
        <Switch color="yellow" />
        <Text>Show notifications on window tab</Text>
      </Group>
    </Stack>
  )
}

export function PetSettings() {
  return (
    <Stack className={classes.section}>
      <Text className={classes.title}>Pet Actions</Text>
      <Button className={classes.button} color="red">
        Delete Pet
      </Button>
    </Stack>
  )
}

export function AccountSettings() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Stack className={classes.section}>
      <Text className={classes.title}>Account Actions</Text>
      <Button onClick={handleLogout} className={classes.button} color="orange">
        Log Out
      </Button>
    </Stack>
  )
}