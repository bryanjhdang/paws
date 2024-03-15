import { useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function StatisticsPage() {
  const [active, setActive ] = useState('Statistics')

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>STATISTICS CONTENT SHOULD GO IN HERE</Text>
      </Flex>
    </Flex>
  );
}

export default StatisticsPage