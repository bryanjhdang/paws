import { useState } from "react";
import { Text, Flex, Button } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function GenerateStatisticsPage() {
  const [active, setActive] = useState('Friends');

  function generateStatistics() {
    
  }

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex>
        <Text>Generate statistics</Text>
        <Button onClick={generateStatistics}>Generate</Button>
      </Flex>
    </Flex>
  )
}

export default GenerateStatisticsPage;