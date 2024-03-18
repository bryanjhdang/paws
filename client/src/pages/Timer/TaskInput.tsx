import { ActionIcon, Divider, Flex, TextInput, Box } from "@mantine/core";
import { IconFolderOpen, IconTag } from "@tabler/icons-react";
import { useState } from "react";

export function TaskInput(): JSX.Element {
  const [task, setTask] = useState<string>("");

  function handleProjectIconClick(): void {
    console.log("project icon clicked");
  }

  function handleTagIconClick(): void {
    console.log("tag icon clicked");
  }

  function taskBoxButton(icon: JSX.Element, onClick: Function): JSX.Element {
    return (
      <>
        <ActionIcon variant="default" size="xl" onClick={() => onClick()}>
          {icon}
        </ActionIcon>
      </>
    );
  }

  return (
    <>
      <Box p={10} w={"100%"}>
        <Flex direction={"row"} align={"center"}>
          <TextInput
            size="xl"
            variant="unstyled"
            placeholder={"What are you working on?"}
            pr={10}
            w={"100%"}
            value={task}
            onChange={(event) => setTask(event.currentTarget.value)}
          />
          <Flex gap={5}>
            {taskBoxButton(<IconFolderOpen />, handleProjectIconClick)}
            {taskBoxButton(<IconTag />, handleTagIconClick)}
          </Flex>
        </Flex>
        <Divider mt={2}/>
      </Box>
    </>
  );
}
