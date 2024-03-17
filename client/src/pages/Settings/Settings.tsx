import { useState } from "react";
import { Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { SimpleHeader } from "../../components/Headers";
import { ThemeSettings, PetSettings, NotificationSettings } from "./SettingsOptions"

function SettingsPage() {
  const [active, setActive] = useState('Settings');

  return (
    <>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex
        direction="column"
        style={{ flex: 1 }}
      >
        <SimpleHeader text="Settings" />
        <ThemeSettings />
        <NotificationSettings />
        <PetSettings />
      </Flex>
    </>
  )
}

export default SettingsPage