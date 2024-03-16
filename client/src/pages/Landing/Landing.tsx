// TODO: If the user comes here but we find that they are logged in, redirect to "/timer" page

import { useNavigate } from "react-router-dom";
import { Center, Box, Flex, Text, Title, Button } from "@mantine/core";

function LandingPage() {
  const navigate = useNavigate();

  function handleSignIn() {
    // TODO: this will navigate to Auth0's login page (what stokely said)
    navigate("/timer");
  }

  function signInButton(): JSX.Element {
    return (
      <>
        <Button
          onClick={handleSignIn}
          variant="gradient"
          gradient={{
            from: "yellow",
            to: "orange",
            deg: 90,
          }}
        >
          SIGN IN
        </Button>
      </>
    );
  }

  function templifyTitle() {
    return (
      <>
        <Center>
          <Title order={1} size={100}>
            <Text
              inherit
              span
              fw={900}
              variant="gradient"
              gradient={{
                from: "rgba(255, 157, 71, 1)",
                to: "rgba(252, 210, 96, 1)",
                deg: 90,
              }}
            >
              TEMPIFY
            </Text>
          </Title>
        </Center>
      </>
    );
  }

  return (
    <>
      <Center style={{ height: "100vh" }}>
        <Box style={{ width: 200 }}>
          <Flex direction="column" gap="md">
            {templifyTitle()}
            {signInButton()}
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default LandingPage;
