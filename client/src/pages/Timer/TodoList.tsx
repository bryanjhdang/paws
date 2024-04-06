import { ActionIcon, Button, Checkbox, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconTrash } from '@tabler/icons-react';
import classes from "./TodoList.module.css"
import { Todo } from "../../classes/models";
import { useEffect, useState } from "react";
import { getTodo, postTodo } from "../../classes/HTTPhelpers";

interface TodoProps {
  item: string;
}

function TodoItem({ item }: TodoProps) {
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

interface TodoEntryProps {
  onAddTodo: (todo: Todo) => void;
}

function TodoEntry({ onAddTodo }: TodoEntryProps) {
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() != "") {
      const newTodo = new Todo(task);
      onAddTodo(newTodo);
    }
  }

  return (

    <>
      <Flex align="center" gap={8}>
        <TextInput 
          className={classes.addinput} 
          value={task} 
          onChange={(event) => setTask(event.currentTarget.value)}
          variant="unstyled" 
          placeholder="New Task" 
        />
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
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodo().then(
      (response) => {
        console.log("response" + response);
        setTodos(response);
      }
    )
  }, []);

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    postTodo(todo);
  }

  return (
    <Stack className={classes.section}>
      <TodoHeader />
      <TodoEntry onAddTodo={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo.task} />
      ))}
    </Stack>
  )
}

export default TodoList;