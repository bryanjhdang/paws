import { useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function ProfilePage() {
  const [active, setActive] = useState('Profile');

  return (
    <>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>PROFILE CONTENT SHOULD GO IN HERE</Text>
      </Flex>
    </>
  )
}

export default ProfilePage