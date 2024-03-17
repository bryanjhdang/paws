import { Select, Card, Text, Button, Switch, Group, Stack } from "@mantine/core";

export function ThemeSettings() {
  return (
    <Card withBorder radius="md" mx="lg" mt="md">
      <Card.Section withBorder p="sm">
        <Text fz="sm" fw={500}>Theme</Text>
        <Text fz="sm" fw={500} c="dimmed">Specify how Tempify will look on your device</Text>
      </Card.Section>
      <Card.Section withBorder maw={300} p="sm">
        <Select
          allowDeselect={false}
          data={['System setting', 'Light', 'Dark']}
        />
      </Card.Section>
    </Card>
  )
}

export function NotificationSettings() {
  return (
    <Card withBorder radius="md" mx="lg" mt="md">
      <Card.Section withBorder p="sm">
        <Text fz="sm" fw={500}>Sound and Notifications</Text>
      </Card.Section>
      <Card.Section withBorder p="sm">
        <Stack>
          <Group>
            <Switch color="yellow" />
            <Text fz="sm">Play Sound when Timer ends</Text>
          </Group>
          <Group>
            <Switch color="yellow" />
            <Text fz="sm">Show Notifications on Tab</Text>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  )
}

export function PetSettings() {
  return (
    <Card withBorder radius="md" mx="lg" mt="md">
      <Card.Section withBorder p="sm">
        <Text fz="sm" fw={500}>Pet Actions</Text>
      </Card.Section>
      <Card.Section maw={300} p="sm">
        <Button variant="outline" color="red">Delete Pet</Button>
      </Card.Section>
    </Card>
  )
}