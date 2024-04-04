import { useAuth0 } from "@auth0/auth0-react";
import { Flex } from "@mantine/core";
import React, { useState } from "react";
import { NavbarSimple } from "../../components/NavbarSimple";

// This callback used as an initial redirect by Auth0, to render the navbar (and any other desired elements)
// and avoid flickering or other UI errors
export const CallbackPage: React.FC = () => {
  const { error } = useAuth0();

  // todo: unsure about what the state of the sidebar should be set to in this instance
  const [active, setActive] = useState('Timer');

  // todo: this error message could look nicer
  if (error) {
    return (
      <Flex>
        <NavbarSimple active={active} setActive={setActive} />
        <Flex>
          <h1>Error</h1>
            <p>
              <span>{error.message}</span>
            </p>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
    </Flex>
  );
};
