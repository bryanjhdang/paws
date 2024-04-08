import { useEffect, useState } from "react";
import { Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { TimeEntry } from "../../classes/models";
import { getTimeEntry } from "../../classes/HTTPhelpers";
// import { getTimeEntryTest } from "../../classes/HTTPhelpers";
// import { useAuth0 } from "@auth0/auth0-react";

function StatisticsPage() {
  const [active, setActive ] = useState('Statistics')
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  // const { getAccessTokenSilently } = useAuth0();

  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       // setAccessToken(token);
  //       getTimeEntryTest(token).then(
  //         (response) => {
  //           setTimeEntries(response);
  //         }
  //       )
  //     } catch (error) {
  //       console.error('Error while fetching access token:', error);
  //     }
  //   };

  //   fetchAccessToken();

  //   // getTimeEntryTest(token).then(
  //   //   (response) => {
  //   //     setTimeEntries(response);
  //   //   }
  //   // )
  // }, []);

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