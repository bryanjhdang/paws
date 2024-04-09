import { DEFAULT_THEME, Modal, Button, Menu, TextInput, ColorPicker, Text, Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconFolderOpen, IconPlus, IconPointFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Project } from "../../classes/models";
import { getProjects, postProject } from "../../classes/HTTPhelpers";
import classes from "./ProjectButton.module.css";
import NewProjectModal from "../../components/NewProjectModal";

interface ProjectButtonProps {
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

export function ProjectButton({ selectedProject, setSelectedProject }: ProjectButtonProps) {
  const [opened, { open, close }] = useDisclosure();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(
      (response) => {
        setProjects(response);
      }
    );
  }, []);

  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
    postProject(project);
  };

  return (
    <>
      <NewProjectModal opened={opened} close={close} onAddProject={handleAddProject} />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            variant="light"
            radius={"lg"}
            color={selectedProject ? selectedProject.hex : "black"}
            leftSection={<IconFolderOpen />}
          >
            {selectedProject ? selectedProject.name : "No Project"}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => setSelectedProject(null)}
            leftSection={<IconPointFilled style={{ width: (14), height: (14) }} />}
          >
            <Text fz={"sm"}>No Project</Text>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Label>Projects</Menu.Label>
          {projects
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(project => (
              <Menu.Item
                key={project.id}
                onClick={() => setSelectedProject(project)}
                leftSection={<IconPointFilled style={{ width: (14), height: (14), color: project.hex }} />}
              >
                <Text fz={"sm"} c={project.hex}>{project.name}</Text>
              </Menu.Item>
            ))}

          <Menu.Divider />
          <Menu.Item
            onClick={() => open()}
            leftSection={<IconPlus style={{ width: (14), height: (14) }} />}
          >
            Create a new project
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
