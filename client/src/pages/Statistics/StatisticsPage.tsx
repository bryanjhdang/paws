import { useEffect, useState } from "react";
import { Text, Flex, Stack } from "@mantine/core";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";
import { SimpleHeader } from "../../components/Headers";

function StatisticsPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    getTimeEntry().then(
      (response) => {
        setTimeEntries(response);
      }
    )
  }, []);

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

export default StatisticsPage