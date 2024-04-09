import { useEffect, useState } from "react";
import { Text, Flex, Stack } from "@mantine/core";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";
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
      <SimpleHeader text="Statistics" />
      <Stack p={40}>
        <Text>The statistics stuff is under construction. Come back after the checkpoint. Here's a JSON representation of the data.</Text>
        <Text style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(timeEntries, null, 2)}</Text>
      </Stack>
    </>
  );
}

export default StatisticsPage;
