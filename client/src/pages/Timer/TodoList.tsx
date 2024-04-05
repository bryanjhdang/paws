import { ActionIcon, Checkbox, Flex, Stack, Text } from "@mantine/core";
import { IconPlus, IconTrash } from '@tabler/icons-react';
import classes from "./TodoList.module.css"

interface TodoProp {
  item: string;
}

function TodoItem({item} : TodoProp) {
  return (
    <Flex align="flex-start">
      <Text className={classes.itemText}>{item}</Text>
      {/* <Checkbox /> */}
      <ActionIcon className={classes.icon} variant="transparent">
        <IconTrash />
      </ActionIcon>
    </Flex>
  )
}

function TodoHeader() {
  return (
    <Flex align="center">
      <Text className={classes.headerText}>To Do</Text>
      <ActionIcon className={classes.icon} variant="transparent">
        <IconPlus />
      </ActionIcon>
    </Flex>
  )
}

function TodoList() {
  return (
    <Stack className={classes.section}>
      <TodoHeader />
      <TodoItem item="1. Assignment 3 adsfpoi j poijads poij asdpoifj " />
    </Stack>
  )
}

export default TodoList;