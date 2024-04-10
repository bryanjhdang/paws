import { Group, Text } from "@mantine/core";
import classes from './Headers.module.css';

export function SimpleHeader({ text }: { text: string }) {
  return (
    <Group className={classes.simpleHeader}>
      <Text className={classes.headerText}>
        {text}
      </Text>
    </Group>
  )
}

export function FunctionalHeader({ text, element }: { text: string, element: JSX.Element }) {
  return (
    <Group className={classes.functionalHeader}>
      <Text className={classes.headerText}>{text}</Text>
      {element}
    </Group>
  )
}

export function TextHeader({ text }: { text: string }) {
  return (
    <Text className={classes.headerText}>
      {text}
    </Text>
  )
}