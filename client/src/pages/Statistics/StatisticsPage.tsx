import { useEffect, useState } from "react";
import { Text, Flex } from "@mantine/core";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";
import { useAuth0 } from "@auth0/auth0-react";

function StatisticsPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();
        getTimeEntry(token).then((response) => {
          setTimeEntries(response);
        });
      } catch (error) {
        console.error(error);
      }
    };

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently]);

  return (
    <>
      <Flex direction={"column"}>
        <Text>
          The statistics stuff is under construction. Come back after the
          checkpoint. Here's a JSON representation of the data.
        </Text>
        <Text style={{ whiteSpace: "pre-line" }}>
          {JSON.stringify(timeEntries, null, 2)}
        </Text>
      </Flex>
    </>
  );
}

export default StatisticsPage;
