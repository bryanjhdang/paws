import { useEffect, useState } from "react";
import { Flex, Space, Stack } from "@mantine/core";

import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";

import { Header } from "./Header/Header";
import { StatisticsGroup } from "./StatisticsGroup/StatisticsGroup";
import { CardGroup } from "./CardGroup/CardGroup";
import { SimpleHeader } from "../../components/Headers";
import { useAuth0 } from "@auth0/auth0-react";

function StatisticsPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();
        getTimeEntry(token).then((response) => {
          console.log(response);
          setTimeEntries(response);
        });
      } catch (error) {
        console.error(error);
      }
    };

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently]);

  return (
    <Stack>
      <SimpleHeader text="Statistics" />
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
    </Stack>
  );
}

export default StatisticsPage;
