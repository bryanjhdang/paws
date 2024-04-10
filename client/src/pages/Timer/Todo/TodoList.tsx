import { ActionIcon, Button, Checkbox, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconTrash, IconFilePencil } from '@tabler/icons-react';
import classes from "./TodoList.module.css"
import { Todo } from "../../../classes/models";
import { useEffect, useState } from "react";
import { deleteTodo, getTodo, patchTodo, postTodo } from "../../../classes/HTTPhelpers";
import { useForm } from "@mantine/form";
import { useAuth0 } from "@auth0/auth0-react";

interface TodoProps {
  item: Todo;
  handleDeleteTodo: (id: string) => void;
  handleSetTask: React.Dispatch<React.SetStateAction<string>>;
}

function TodoItem({ item, handleDeleteTodo, handleSetTask }: TodoProps) {
  const [checked, setChecked] = useState(item.done);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setChecked(item.done);
  }, [item.done]);

  const handlePatchTodo = async (checked: boolean) => {
    setChecked(checked);
    item.done = checked;

    try {
      const token = await getAccessTokenSilently();
      await patchTodo(item, token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex align="center" className={classes.todoItem}>
      <Checkbox
        checked={checked}
        onChange={(event) => handlePatchTodo(event.currentTarget.checked)}
        size="xs"
      />
      <Text className={`${classes.itemText} ${checked ? classes.itemCompleted : ''}`}>
        {item.task}
      </Text>
      <ActionIcon
        className={classes.icon}
        variant="transparent"
        onClick={() => handleSetTask(item.task)}
      >
        <IconFilePencil stroke={1.5} width={20} />
      </ActionIcon>
      <ActionIcon
        className={classes.icon}
        variant="transparent"
        onClick={() => handleDeleteTodo(item.id)}
      >
        <IconTrash stroke={1.5} width={20} />
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
          placeholder="+ New"
          color="white"
          styles={{
            input: {
              color: 'white'
            }
          }}
        />
      </Flex>
    </form>
  );
}

function TodoHeader() {
  return (
    <Text className={classes.headerText}>To Do</Text>
  )
}

interface TodoListProps {
  setTask: React.Dispatch<React.SetStateAction<string>>;
}

function TodoList({ setTask } : TodoListProps ) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();

        getTodo(token).then(
          (response) => {
            setTodos(response);
          }
        )
      } catch (error) {
        console.error(error);
      }
    }

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently]);

  // todo: prefer try...catch?
  const handleAddTodo = (todo: Todo) => {
    getAccessTokenSilently().then((token) => {
      setTodos([...todos, todo]);
      postTodo(todo, token);
    }).catch((error) => {
      console.error(error);
    })

  }

  // todo: prefer try...catch?
  const handleDeleteTodo = (id: string) => {
    getAccessTokenSilently().then((token) => {
      deleteTodo(id, token).then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <Stack className={classes.section}>
      <TodoHeader />
      {todos.length > 0 ? (
        <Stack className={classes.todolist} gap={10}>
          {todos
            .sort((a, b) => a.dateCreated - b.dateCreated)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                item={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleSetTask={setTask}
              />
            ))}
        </Stack>
      ) : (
        <></>
      )}
      <TodoEntry handleAddTodo={handleAddTodo} />
    </Stack>
  )
}

export default TodoList;