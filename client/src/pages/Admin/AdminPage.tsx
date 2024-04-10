import { Stack, Text } from "@mantine/core";
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
      <Stack p={40} flex={1}>
        <Text>{isAdmin ? "authorized!" : "not authorized"}</Text>
      </Stack>
    </>
  )
}

export default AdminPage