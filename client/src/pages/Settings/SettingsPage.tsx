import { useState } from "react";
import { Flex, Stack } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { SimpleHeader } from "../../components/Headers";
import { ThemeSettings, PetSettings, NotificationSettings } from "./SettingsOptions"

function SettingsPage() {
  const [active, setActive] = useState('Settings');

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack flex={1}>
        <SimpleHeader text="Settings" />
        <Stack mx="lg">
          <ThemeSettings />
          <NotificationSettings />
          <PetSettings />
        </Stack>
      </Stack>
    </Flex>
  )
}

export default SettingsPage