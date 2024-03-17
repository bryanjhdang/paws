import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import React from "react";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/timer",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button onClick={handleLogin}>
      Log In
    </Button>
  );
};
