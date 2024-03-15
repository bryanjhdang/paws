import { useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function SettingsPage() {
  const [active, setActive] = useState('Settings');

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>SETTINGS CONTENT SHOULD GO IN HERE</Text>
      </Flex>
    </Flex>
  )
}

export default SettingsPage