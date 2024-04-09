import { useEffect, useState } from "react";
import { Flex, Space, Card } from "@mantine/core";
import ReactECharts from "echarts-for-react";

import { NavbarSimple } from "../../components/NavbarSimple";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";

import { Header } from "./Header/Header";
import { StatisticsGroup } from "./StatisticsGroup/StatisticsGroup";
import { CardGroup } from "./CardGroup/CardGroup";

function StatisticsPage() {
  const [active, setActive] = useState("Stats");
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    getTimeEntry().then((response) => {
      setTimeEntries(response);
    });
  }, []);

  return (
    <Flex direction={"row"} justify={"flex-start"}>
      <Flex
        direction={"column"}
        justify={"flex-start"}
        align={"center"}
        w={"100%"}
        p={"md"}
        miw={"48em"} // can be set to 86em to prevent horizontal squishing
      >
        <Header />

        <Space h={"xl"} />

        <StatisticsGroup timeEntries={timeEntries} />

        <Space h={"xl"} />

        <CardGroup timeEntries={timeEntries} />

        <Space h={"xl"} />
      </Flex>
    </Flex>
  );
}

export default StatisticsPage;
