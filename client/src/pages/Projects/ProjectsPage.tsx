import { Button, Group, Stack, Table, Text } from "@mantine/core";
import { FunctionalHeader, SimpleHeader, TextHeader } from "../../components/Headers";
import { Project } from "../../classes/models";
import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../../classes/HTTPhelpers";
import { IconCoin, IconPlus } from "@tabler/icons-react";
import classes from "./ProjectsPage.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();

        getProjects(token).then(
          (response) => {
            setProjects(response);
          }
        );

      } catch (error) {
        console.error(error);
      }
    }

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently]);

  // todo: prefer this syntax to try...catch?
  const handleDeleteProject = (id: string) => {
    getAccessTokenSilently().then((token) => {
      deleteProject(id, token).then(() => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        setProjects(updatedProjects);
      })
    }).catch((error) => {
      console.error(error);
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