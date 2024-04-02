import { useState } from "react";
import { Text, Flex, Button } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

import { TimeEntry } from "../../classes/models";

function GenerateStatisticsPage() {
  const [active, setActive] = useState('Friends');

  function generateStatistics() {

  }

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>Generate statistics this page does nothing disregard</Text>
        <Button onClick={generateStatistics}>Generate</Button>
      </Flex>
    </Flex>
  )
}

export default GenerateStatisticsPage;