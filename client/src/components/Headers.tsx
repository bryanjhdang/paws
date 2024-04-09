import { Group, Text } from "@mantine/core";
import classes from './Headers.module.css';

export function SimpleHeader({ text }: { text: string }) {
  return (
    <Text className={classes.simpleHeader}>
      {text}
    </Text>
  )
}

export function FunctionalHeader({ text, element }: { text : string, element: JSX.Element}) {
  return (
    <Group className={classes.functionalHeader}>
      <Text className={classes.functionalHeaderText}>{text}</Text>
      {element}
    </Group>
  )
}

export function TextHeader({ text }: { text: string }) {
  return (
    <Text className={classes.textHeader}>
      {text}
    </Text>
  )
}