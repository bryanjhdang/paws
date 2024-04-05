import { Text } from "@mantine/core";
import classes from './Headers.module.css';

export function SimpleHeader({ text }: { text: string }) {
  return (
    <Text className={classes.simpleHeader}>
      {text}
    </Text>
  )
}

export function TextHeader({ text }: { text: string }) {
  return (
    <Text className={classes.textHeader}>
      {text}
    </Text>
  )
}