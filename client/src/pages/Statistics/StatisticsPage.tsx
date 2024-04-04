import { useEffect, useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";

function StatisticsPage() {
  const [active, setActive ] = useState('Statistics')
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    getTimeEntry().then(
      (response) => {
        setTimeEntries(response);
      }
    )
  }, []);

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex direction={'column'}>
        <Text>The statistics stuff is under construction. Come back after the checkpoint. Here's a JSON representation of the data.</Text>
        <Text style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(timeEntries, null, 2)}</Text>
      </Flex>
    </Flex>
  );
}

export default StatisticsPage