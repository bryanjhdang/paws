import { useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function PetPage() {
  const [active, setActive ] = useState('Pet')

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>PET PAGE CONTENT SHOULD GO IN HERE</Text>
      </Flex>
    </Flex>
  );
}

export default PetPage