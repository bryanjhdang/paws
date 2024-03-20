import { DEFAULT_THEME, Modal, Button, Divider, Flex, Menu, TextInput, ColorPicker, Text, Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconFolderOpen, IconPlus, IconPointFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Project } from "../../classes/models";

function NewProjectModal() {

}

export function ProjectButton({ selectedProject, onSelectProject }: { selectedProject: Project | null, onSelectProject: (project : Project | null) => void}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState(DEFAULT_THEME.colors.red[4])

  // This should be retrieved from a GET request
  const [projects, setProjects] = useState<Project[]>([
    new Project("1", "#007bff", "CMPT 372"), 
    new Project("2", "#dc3545", "CMPT 410"), 
  ]);

  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleCreateProject = () => {
    const newProject = new Project(
      Date.now().toString(), // Generate a unique ID
      newProjectColor,
      newProjectName
    );
    handleAddProject(newProject);
    close(); // Close the modal after adding the project
    setNewProjectName(""); // Reset project name input
    setNewProjectColor(DEFAULT_THEME.colors.red[4]); // Reset project color
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create new project" centered>
        <Stack>
          <TextInput
            withAsterisk
            placeholder={"Project name"}
            value={newProjectName}
            onChange={(event) => setNewProjectName(event.currentTarget.value)}
          />
          <ColorPicker
            format="hex"
            value={newProjectColor}
            onChange={(color) => setNewProjectColor(color)}
            withPicker={false}
            fullWidth
            swatches={
              Object.values(DEFAULT_THEME.colors).map(colorArray => colorArray[4])
            }
          />
          <Text>{newProjectColor}</Text>
          <Button w={"100%"} onClick={handleCreateProject}>Create project</Button>
        </Stack>
      </Modal>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            variant="light"
            radius={"xl"}
            color={selectedProject ? selectedProject.hex : "black"}
            leftSection={<IconFolderOpen />}
          >
            {selectedProject ? selectedProject.name : "No Project"}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item 
            onClick={() => onSelectProject(null)}
            leftSection={<IconPointFilled style={{ width: (14), height: (14) }} />}
          >
            <Text fz={"sm"}>No Project</Text>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Projects</Menu.Label>
          {projects.map(project => (
            <Menu.Item 
              key={project.id} 
              onClick={() => onSelectProject(project)}
              leftSection={<IconPointFilled style={{ width: (14), height: (14), color: project.hex }} />}
            >
              <Text fz={"sm"} c={project.hex}>{project.name}</Text>
            </Menu.Item>
          ))}

          <Menu.Divider />
          <Menu.Item
            onClick={open}
            leftSection={<IconPlus style={{ width: (14), height: (14) }} />}
          >
            Create a new project
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
