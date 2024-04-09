// import { useState } from "react";
import { Stack } from "@mantine/core";
import { SimpleHeader } from "../../components/Headers";
import { NotificationSettings, AccountSettings } from "./SettingsOptions"
// import { useAuth0 } from "@auth0/auth0-react";
// import classes from "./SettingsPage.module.css";

// function ProfileDisplay() {
//   const { user } = useAuth0();
//   if (!user) return null;

//   return (
//     <Group className={classes.profile}>
//       <Avatar src={user.picture} size="xxl" />
//       <Stack ml={30} gap="xs" flex={1}>
//         <Text className={classes.profileHeading}>Profile Info</Text>
//         <Text>Name {user.name}</Text>
//         <Text>Email {user.email}</Text>
//       </Stack>
//     </Group>
//   )
// }

function SettingsPage() {
  return (
    <>
      <SimpleHeader text="Settings" />
      <Stack p={40} flex={1}>
        <AccountSettings />
      </Stack>
    </>
  )
}

export default SettingsPage