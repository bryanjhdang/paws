import { useEffect } from "react";

import { Flex, TextInput } from "@mantine/core";

import { Project } from "../../../classes/models";
import { ProjectButton } from "../ProjectButton";
import { TimerButton } from "./TimerButton";

import { useTimerContext } from "../../../context/TimerContext";
import { getAccount } from "../../../classes/HTTPhelpers";
import { useAuth0 } from "@auth0/auth0-react";

import classes from "./TaskInput.module.css";

interface TaskInputProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

export function TaskInput({
  task,
  setTask,
  selectedProject,
  setSelectedProject,
}: TaskInputProps): JSX.Element {
  return (
    <>
      <Flex className={classes.textinput}>
        <TextInput
          size="xl"
          variant="unstyled"
          placeholder={"What are you working on?"}
          w={"100%"}
          value={task}
          onChange={(event) => setTask(event.currentTarget.value)}
        />
        <Flex gap={"xs"}>
          {/* <TimerButton task={task} selectedProject={selectedProject} /> */}
          <ProjectButton
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
          <TimerButton 
            task={task}
            selectedProject={selectedProject}
          />
        </Flex>
      </Flex>
    </>
  );
}
