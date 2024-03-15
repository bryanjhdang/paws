import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function SettingsPage() {
  return (
    <Flex>
      <NavbarSimple />
      <Flex>
        <Text>SETTINGS CONTENT SHOULD GO IN HERE</Text>
      </Flex>
    </Flex>
  )
}

export default SettingsPage