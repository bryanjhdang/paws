import { useState } from "react";
import { Text, Flex, Space, Avatar, Stack } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { useAuth0 } from "@auth0/auth0-react";

// example of retrieving user information
function ProfilePage() {
  const [active, setActive] = useState("Profile");
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <Flex>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack ml="lg" mt="lg">
        <Text fw={500}>PROFILE CONTENT:</Text>
        <Avatar src={user.picture} radius="xl" size="lg" />
        <Space h="lg" />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Stack>
    </Flex>
  );
}

export default ProfilePage;
