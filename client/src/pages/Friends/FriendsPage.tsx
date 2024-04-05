import { useState } from "react";
import { Text, Flex, Stack } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { TextHeader } from "../../components/Headers";

function FriendsPage() {
  const [active, setActive] = useState('Friends');

  return (
    <Flex direction={'row'} gap={50}>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack>
        <TextHeader text="Friends" />
        <Text>The friends stuff is under construction. Come back after the checkpoint.</Text>
      </Stack>
    </Flex>
  )
}

export default FriendsPage