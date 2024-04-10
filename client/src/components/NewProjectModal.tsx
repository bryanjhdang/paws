import { DEFAULT_THEME, Modal, Button, TextInput, ColorPicker, Text, Stack } from "@mantine/core";
import { useState } from "react";
import { Project } from "../classes/models";
import classes from "./NewProjectModal.module.css";

interface NewProjectModalProps {
  opened: boolean;
  close: () => void,
  onAddProject: (project: Project) => void;
}

export default function NewProjectModal({ opened, close, onAddProject }: NewProjectModalProps): JSX.Element {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState(DEFAULT_THEME.colors.red[4]);

  const handleCreateProject = () => {
    if (projectName.length === 0) return;

    const newProject = new Project(projectColor, projectName, Date.now(), Date.now().toString());
    onAddProject(newProject);
    close();
    setProjectName("");
    setProjectColor(DEFAULT_THEME.colors.red[4]);
  }

  return (
    <Modal 
      opened={opened} 
      onClose={close} 
      title="Create a new project" 
      centered 
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Project Name"
          placeholder={"Web II"}
          value={projectName}
          onChange={(event) => setProjectName(event.currentTarget.value)}
          className={classes.test}
        />
        <ColorPicker
          format="hex"
          swatchesPerRow={10}
          value={projectColor}
          onChange={(color) => setProjectColor(color)}
          withPicker={false}
          fullWidth
          swatches={
            Object.values(DEFAULT_THEME.colors).map(colorArray => colorArray[4])
          }
        />
        <Text
          style={{
            backgroundColor: projectColor,
            textAlign: 'center',
            borderRadius: 'var(--mantine-radius-lg)',
            padding: '5px 15px',
            marginBottom: '10px',
          }}    
        >
           
        </Text>
        <Button color="#a36384" className={classes.submitBtn} onClick={handleCreateProject}>Create project</Button>
      </Stack>
    </Modal>
  )
}