import { Select, Card, Text, Button, Switch, Group, Stack } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export function ThemeSettings() {
  return (
    <Card withBorder radius="md">
      <Card.Section withBorder p="md">
        <Text fw={500}>Theme</Text>
        <Text fw={500} c="dimmed">Specify how Tempify will look on your device</Text>
      </Card.Section>
      <Card.Section withBorder p="md">
        <Select
          maw={300}
          allowDeselect={false}
          data={['System setting', 'Light', 'Dark']}
        />
      </Card.Section>
    </Card>
  )
}

export function NotificationSettings() {
  return (
    <Card withBorder radius="md">
      <Card.Section withBorder p="md">
        <Text fw={500}>Sound and Notifications</Text>
      </Card.Section>
      <Card.Section withBorder p="md">
        <Stack>
          <Group>
            <Switch color="yellow" />
            <Text>Play Sound when Timer ends</Text>
          </Group>
          <Group>
            <Switch color="yellow" />
            <Text>Show Notifications on Tab</Text>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  )
}

export function PetSettings() {
  return (
    <Card withBorder radius="md">
      <Card.Section withBorder p="md">
        <Text fw={500}>Pet Actions</Text>
      </Card.Section>
      <Card.Section p="md">
        <Button 
          maw={300}
          variant="outline" 
          color="red"
        >
          Delete Pet
        </Button>
      </Card.Section>
    </Card>
  )
}

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="outline"
      color="yellow"
    >
      Log Out
    </Button>
  );
};

export function AccountSettings() {
  return (
    <Card withBorder radius="md">
      <Card.Section withBorder p="md">
        <Text fw={500}>Account Actions</Text>
      </Card.Section>
      <Card.Section p="md">
        <LogoutButton />
      </Card.Section>
    </Card>
  )
}