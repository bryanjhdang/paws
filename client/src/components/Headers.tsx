import { Paper, Text, Title } from "@mantine/core";
import classes from './Headers.module.css';

export function SimpleHeader({ text }: { text: string }) {
  return (
    <Paper radius="0" shadow="xl" p="lg">
      <Title order={4}>{text}</Title>
    </Paper>
  )
}

export function TextHeader({ text }: { text: string }) {
  return (
    <Text className={classes.headingText}>
      {text}
    </Text>
  )
}