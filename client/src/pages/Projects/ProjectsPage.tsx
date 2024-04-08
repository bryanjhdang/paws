import { Button, Stack, Table } from "@mantine/core";
import { TextHeader } from "../../components/Headers";

function ProjectsPage() {
  const elements = [
    { id: 6, mass: 12.011, hex: 'C', name: 'Project 1' },
    { id: 7, mass: 14.007, hex: 'N', name: 'Project 2' },
    { id: 39, mass: 88.906, hex: 'Y', name: 'Project 3' },
    { id: 56, mass: 137.33, hex: 'Ba', name: 'Project 4' }
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.hex}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Table.Td>
    </Table.Tr>
  ));


  return (
    <Stack>
      <TextHeader text="Projects" />
      {/* Display projects */}
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
  )
}

export default ProjectsPage;