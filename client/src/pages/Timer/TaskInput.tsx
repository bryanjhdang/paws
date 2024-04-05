import { Flex, TextInput } from "@mantine/core";
import { Project } from "../../classes/models";
import { ProjectButton } from "./ProjectButton";
import classes from './TaskInput.module.css';

interface TaskInputProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

export function TaskInput({ task, setTask, selectedProject, setSelectedProject }: TaskInputProps): JSX.Element {
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
        <Flex>
          <ProjectButton 
            selectedProject={selectedProject} 
            setSelectedProject={setSelectedProject} 
          />
        </Flex>
      </Flex>
    </>
  );
}
