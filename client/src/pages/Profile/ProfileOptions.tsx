import { Card, Text, Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

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