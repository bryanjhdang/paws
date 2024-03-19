import { ActionIcon, Divider, Flex, TextInput } from "@mantine/core";
import { IconFolderOpen, IconTag } from "@tabler/icons-react";
import { useState } from "react";
import ProjectButton from "./ProjectButton";


export function TaskInput(): JSX.Element {
  const [task, setTask] = useState<string>("");

  function handleProjectIconClick(): void {
    console.log("project icon clicked");
    // pop up
  }
  
  function taskBoxButton(icon: JSX.Element, onClick: Function): JSX.Element {
    return (
      <ActionIcon variant="default" size="xl" onClick={() => onClick()}>
        {icon}
      </ActionIcon>
    );
  }

  return (
    <>
      <Flex px={20} align={"center"}>
        <TextInput
          size="xl"
          variant="unstyled"
          placeholder={"What are you working on?"}
          w={"100%"}
          value={task}
          onChange={(event) => setTask(event.currentTarget.value)}
        />
        <Flex gap={10}>
          {taskBoxButton(<IconFolderOpen />, handleProjectIconClick)}
          <ProjectButton />
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}
