import { Divider, Flex, TextInput } from "@mantine/core";
import { Project } from "../../classes/models";
import { ProjectButton } from "./ProjectButton";

interface TaskInputProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

export function TaskInput({ task, setTask, selectedProject, setSelectedProject }: TaskInputProps): JSX.Element {
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
        <Flex>
          <ProjectButton 
            selectedProject={selectedProject} 
            setSelectedProject={setSelectedProject} 
          />
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}
