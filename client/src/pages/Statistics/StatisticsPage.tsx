import { useEffect, useState } from "react";
import { Flex, Divider } from "@mantine/core";

import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";

import { StatisticsGroup } from "./StatisticsGroup/StatisticsGroup";
import { Header } from "./Header/Header";

function StatisticsPage() {
  const [active, setActive] = useState("Statistics");
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    getTimeEntry().then((response) => {
      setTimeEntries(response);
    });
  }, []);

  return (
    <Flex direction={"row"}>
      <NavbarSimple active={active} setActive={setActive} />

      <Flex direction={"column"} flex={1} p={"md"}>
        <Header />

        <Divider my={"lg"} />

        <StatisticsGroup timeEntries={timeEntries} />
      </Flex>
    </Flex>
  );
}

export default StatisticsPage;
