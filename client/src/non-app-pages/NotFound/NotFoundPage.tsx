import { Stack, Text } from "@mantine/core";
import React from "react";
import classes from "./NotFoundPage.module.css";

// todo: flesh our this stub for unhandled routes.  home button, etc?
export const NotFoundPage: React.FC = () => {
  return (
    <Stack mt={'50px'} align="center">
      <Text className={classes.header}>
        Sorry, this page isn't available.
      </Text>
      <Text>
        The link you followed may be broken, or the page may have been removed.
      </Text>
    </Stack>
  );
};
