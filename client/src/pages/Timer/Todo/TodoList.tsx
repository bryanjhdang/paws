import { ActionIcon, Button, Checkbox, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconTrash } from '@tabler/icons-react';
import classes from "./TodoList.module.css"
import { Todo } from "../../../classes/models";
import { useEffect, useState } from "react";
import { deleteTodo, getTodo, patchTodo, postTodo } from "../../../classes/HTTPhelpers";
import { useForm } from "@mantine/form";

interface TodoProps {
  item: Todo;
  handleDeleteTodo: (id: string) => void;
}

function TodoItem({ item, handleDeleteTodo }: TodoProps) {
  const [checked, setChecked] = useState(item.done);

  useEffect(() => {
    setChecked(item.done);
  }, [item.done]);

  const handlePatchTodo = async (checked: boolean) => {
    setChecked(checked);
    item.done = checked;

    try {
      await patchTodo(item);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex align="flex-start" gap={10}>
      <Checkbox
        checked={checked}
        onChange={(event) => handlePatchTodo(event.currentTarget.checked)}
      />
      <Text className={`${classes.itemText} ${checked ? classes.itemCompleted : ''}`}>
        {item.task}
      </Text>
      <ActionIcon
        className={classes.icon}
        variant="transparent"
        onClick={() => handleDeleteTodo(item.id)}
      >
        <IconTrash />
      </ActionIcon>
    </Flex>
  )
}

interface TodoEntryProps {
  handleAddTodo: (todo: Todo) => void;
}

function TodoEntry({ handleAddTodo }: TodoEntryProps) {
  const form = useForm({
    initialValues: {
      task: '',
    },
  });

  const addTask = (values: any) => {
    const task = values.task.trim();
    if (task) {
      const date = Date.now();
      const newTodo = new Todo(task, date, false, date.toString());
      handleAddTodo(newTodo);
    }
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(addTask)}>
      <Flex align="center">
        <TextInput
          {...form.getInputProps('task')}
          className={classes.addinput}
          variant="unstyled"
          placeholder="New Task"
        />
        <Button type="submit" className={classes.addbutton}>Add</Button>
      </Flex>
    </form>
  );
}

function TodoHeader() {
  return (
    <Text className={classes.headerText}>To Do</Text>
  )
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodo().then(
      (response) => {
        setTodos(response);
      }
    )
  }, []);

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    postTodo(todo);
  }

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    })
  }

  return (
    <Stack className={classes.section}>
      <TodoHeader />
      <TodoEntry handleAddTodo={handleAddTodo} />
      {todos.length > 0 ? (
        <Stack className={classes.todolist}>
          {todos
            .sort((a, b) => a.dateCreated - b.dateCreated)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                item={todo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))}
        </Stack>
      ) : (
        <Text className={classes.noTodoText}>Enter some tasks!</Text>
      )}
    </Stack>
  )
}

export default TodoList;