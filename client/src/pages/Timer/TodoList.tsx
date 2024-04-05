import { ActionIcon, Flex, Stack, Text } from "@mantine/core";
import classes from "./TodoList.module.css"

function TodoItem(item: string) {
  return (
    <>
      <Text>{item}</Text>
    </>
  )
}

function TodoList() {
  // Section
  // Title
  // Add button
  // Body
  // array of tasks (GET)
  // cross off
  // delete

  return (
    <Stack className={classes.section}>
      <Flex>
        <Text>To Do List</Text>
        <ActionIcon></ActionIcon>
      </Flex>
    </Stack>
  )
}

export default TodoList;