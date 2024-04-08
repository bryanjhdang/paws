import { useEffect, useState } from "react";
import { Text, Flex } from "@mantine/core";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";

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
      <Flex direction={'column'}>
        <Text>The statistics stuff is under construction. Come back after the checkpoint. Here's a JSON representation of the data.</Text>
        <Text style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(timeEntries, null, 2)}</Text>
      </Flex>
    </>
  );
}

export default StatisticsPage