// TODO: If the user comes here but we find that they are logged in, redirect to "/timer" page

import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Button, Space } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { SignupButton } from "../../components/Buttons/SignupButton";
import { LoginButton } from "../../components/Buttons/LoginButton";
import { LogoutButton } from "../../components/Buttons/LogoutButton";

function LandingPage() {
  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  const goToTimer = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/timer");
  };

  return (
    <>
      <Text>This is the landing / sign-in page. It's under construction.</Text>
      <Text>Press the button to head to the "main app".</Text>
      <a onClick={goToTimer}>
        <Button>
          Timer
        </Button>
      </a>

      <Space h='md' />

      {!isAuthenticated && (
        <>
          <div style={{display: 'flex'}}>
            <SignupButton />
            <Space w="md" />
            <LoginButton />
          </div>
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </>
  );
}

export default LandingPage;
