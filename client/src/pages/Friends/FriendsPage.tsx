import { useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function FriendsPage() {
  const [active, setActive] = useState('Friends');

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>FRIENDS CONTENT SHOULD GO IN HERE</Text>
      </Flex>
    </Flex>
  )
}

export default FriendsPage