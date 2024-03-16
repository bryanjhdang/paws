import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
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
    <Button onClick={handleLogout} variant="outline" color="dark">
      Log Out
    </Button>
  );
};
