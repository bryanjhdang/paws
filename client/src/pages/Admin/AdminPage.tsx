import { Stack, Text, Button } from "@mantine/core";
import { SimpleHeader } from "../../components/Headers";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { getIdTokenClaims } = useAuth0();

  useEffect(() => {
    getIdTokenClaims().then((token) => {
      if (token && token['roleType/roles']) {
        const roles = token['roleType/roles'];
        setIsAdmin(roles.includes('Admin'));
      }
    }).catch(error => {
      console.error('Error fetching token: ', error);
      setIsAdmin(false);
    })
  }, [getIdTokenClaims]);

  return (
    <>
      <SimpleHeader text="Admin" />
      {isAdmin ? (
        /* Admin content */
        <Stack p={40} align="flex-start">
          <Text>{"authorized!"}</Text>
          <Button variant="filled" size="md">Add Coins</Button>
        </Stack>
      ) : (
        /* Non-Admin content */
        <Stack p={40} align="flex-start">
          <Text>{"Error: Not Authorized"}</Text>
        </Stack>
      )}
      
    </>
  )
}

export default AdminPage