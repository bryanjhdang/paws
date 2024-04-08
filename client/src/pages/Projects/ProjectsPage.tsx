import { Button, Group, Stack, Table, Text } from "@mantine/core";
import { FunctionalHeader, SimpleHeader, TextHeader } from "../../components/Headers";
import { Project } from "../../classes/models";
import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../../classes/HTTPhelpers";
import { IconCoin, IconPlus } from "@tabler/icons-react";
import classes from "./ProjectsPage.module.css";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(
      (response) => {
        setProjects(response);
      }
    );
  }, []);

  const handleDeleteProject = (id: string) => {
    deleteProject(id).then(() => {
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
    })
  }

  const addProjectButton = () => {
    return (
      <Button>
        TODO Add
      </Button>
    )
  }

  const rows = projects.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.hex}</Table.Td>
      <Table.Td>TODO</Table.Td>
      <Table.Td>
        <Button>TODO Edit</Button>
        <Button onClick={() => handleDeleteProject(element.id)}>Delete</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <FunctionalHeader text="Projects" element={addProjectButton()} />
      <Stack p={40}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Project</Table.Th>
              <Table.Th>Color</Table.Th>
              <Table.Th>Date Created</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </>
  )
}

export default ProjectsPage;