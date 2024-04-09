import { useState } from "react";
import { Flex } from "@mantine/core";
import { TaskInput } from "./TaskInputBar/TaskInput";
import { Timer } from "./TaskInputBar/Timer";
import { Project } from "../../classes/models";
import TodoList from "./Todo/TodoList";
import SocketConnection from "./SocketConnection/SocketConnection";
// import classes from "./TimerPage.module.css";
// import BongoCat from "../../assets/sleepy-cat-1.gif";

function TimerPage() {
  const [task, setTask] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Flex direction={"row"} py={20} px={40} gap={20}>
      <Flex direction={"column"} flex={1}>
        <TaskInput
          task={task}
          setTask={setTask}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        {/* <Image className={classes.sleepyBreathing} w={300} h={300} src={BongoCat} /> */}
        <Timer
          task={task}
          selectedProject={selectedProject}
        />
      </Flex>
      <Flex direction={"column"} gap={20}>
        <TodoList />
        <SocketConnection />
      </Flex>
    </Flex>
  );
}

export default TimerPage;
