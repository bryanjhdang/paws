import { Stack, Text, Button } from "@mantine/core";
import { SimpleHeader } from "../../components/Headers";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { addCoins } from "../../classes/HTTPhelpers";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

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

  const handleAddCoins = (numCoins: number) => {
    getAccessTokenSilently().then((token) => {
      // const userId = user?.sub || "not logged in";
      addCoins(numCoins, token).catch(error => {
        console.error("Could not add coins:", error);
      });
    }).catch(error => {
      console.error(error);
    })
  };

  return (
    <>
      <SimpleHeader text="Admin" />
      {isAdmin ? (
        /* Admin content */
        <Stack p={40} align="flex-start">
          <Text>{"authorized!"}</Text>
          <Button variant="filled" size="md" onClick={() => handleAddCoins(100)}>Add Coins</Button>
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