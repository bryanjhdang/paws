import { DEFAULT_THEME, Modal, Button, TextInput, ColorPicker, Text, Stack } from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';
// import { IconPlus, IconPointFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Project } from "../classes/models";
// import { getProjects, postProject } from "../classes/HTTPhelpers";
// import classes from "./ProjectButton.module.css";

interface NewProjectModalProps {
  opened: boolean;
  close: () => void,
  onAddProject: (project: Project) => void;
}

export default function NewProjectModal({ opened, close, onAddProject }: NewProjectModalProps): JSX.Element {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState(DEFAULT_THEME.colors.red[4]);

  const handleCreateProject = () => {
    const newProject = new Project(projectColor, projectName, Date.now(), Date.now().toString());
    onAddProject(newProject);
    close();
    setProjectName("");
    setProjectColor(DEFAULT_THEME.colors.red[4]);
  }

  return (
    <Modal opened={opened} onClose={close} title="Create new project" centered>
      <Stack>
        <TextInput
          withAsterisk
          placeholder={"Project name"}
          value={projectName}
          onChange={(event) => setProjectName(event.currentTarget.value)}
        />
        <ColorPicker
          format="hex"
          value={projectColor}
          onChange={(color) => setProjectColor(color)}
          withPicker={false}
          fullWidth
          swatches={
            Object.values(DEFAULT_THEME.colors).map(colorArray => colorArray[4])
          }
        />
        <Text>{projectColor}</Text>
        <Button w={"100%"} onClick={handleCreateProject}>Create project</Button>
      </Stack>
    </Modal>
  )
}