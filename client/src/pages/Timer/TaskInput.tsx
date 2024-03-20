import { DEFAULT_THEME, Modal, Button, Divider, Flex, Menu, TextInput, ColorPicker, Text, Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconFolderOpen, IconPlus, IconPointFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Project } from "../../classes/models";

function ProjectButton({ projects, selectedProject, onSelectProject, onAddProject }: { projects: Project[], selectedProject: Project | null, onSelectProject: (project : Project | null) => void, onAddProject: (project: Project) => void }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState(DEFAULT_THEME.colors.red[4])

  const handleCreateProject = () => {
    const newProject = new Project(
      Date.now().toString(), // Generate a unique ID
      newProjectColor,
      newProjectName
    );
    onAddProject(newProject);
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

          {/* This should bring up a modal to add to the projects */}
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

export function TaskInput(): JSX.Element {
  const [task, setTask] = useState<string>("");
  const [project, setProject] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // This should be retrieved from a GET request later
  const [projects, setProjects] = useState<Project[]>([
    new Project("1", "#007bff", "CMPT 372"), // Blue color
    new Project("2", "#dc3545", "CMPT 410"), // Red color
  ]);
  
  const handleSelectProject = (project: Project | null) => {
    setSelectedProject(project);
    console.log("thing changed")
  };

  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };

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
            projects={projects} 
            selectedProject={selectedProject} 
            onSelectProject={handleSelectProject} 
            onAddProject={handleAddProject}
          />
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}
