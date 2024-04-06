import { ActionIcon, Button, Checkbox, Flex, Stack, Text, TextInput } from "@mantine/core";
import {IconTrash } from '@tabler/icons-react';
import classes from "./TodoList.module.css"

interface TodoProp {
  item: string;
}

function TodoItem({ item }: TodoProp) {
  return (
    <Flex align="flex-start" gap={10}>
      <Checkbox />
      <Text className={classes.itemText}>{item}</Text>
      <ActionIcon className={classes.icon} variant="transparent">
        <IconTrash />
      </ActionIcon>
    </Flex>
  )
}

function TodoEntry() {
  const addTask = () => {
    // add props in here and edit field
  }

  return (
    <>
      <Flex align="center" gap={8}>
        <TextInput className={classes.addinput} variant="unstyled" placeholder="New Task" />
        <Button className={classes.addbutton} onClick={addTask}>
          Add
        </Button>
      </Flex>
    </>
  )
}

function TodoHeader() {
  return (
    <Flex align="center">
      <Text className={classes.headerText}>To Do</Text>
    </Flex>
  )
}

function TodoList() {
  return (
    <Stack className={classes.section}>
      <TodoHeader />
      <TodoEntry />
      <TodoItem item="Assignment 3 adsfpoi j poijads poij asdpoifj " />
    </Stack>
  )
}

export default TodoList;