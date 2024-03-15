// TODO: If the user comes here but we find that they are logged in, redirect to "/timer" page

import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from "@mantine/core";

function LandingPage() {
  const navigate = useNavigate();

  const goToTimer = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/timer');
  }

  return (
    <>
      <Text>This is the landing / sign-in page. It's under construction.</Text>
      <Text>Press the button to head to the "main app".</Text>
      <a onClick={goToTimer}>
        <Button>
          Timer
        </Button>
      </a>
    </>
  );
}

export default LandingPage;