import { Paper, Title } from "@mantine/core";

export function SimpleHeader({ text }: { text: string }) {
  return (
    <Paper radius="0" shadow="xl" p="lg">
      <Title order={4}>{text}</Title>
    </Paper>
  )
}