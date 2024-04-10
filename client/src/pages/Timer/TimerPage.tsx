import { useState, useEffect } from "react";
import { Flex } from "@mantine/core";
import { TaskInput } from "./TaskInputBar/TaskInput";
import { Project, TimerStatus } from "../../classes/models";
import TodoList from "./Todo/TodoList";
// import classes from "./TimerPage.module.css";
// import BongoCat from "../../assets/sleepy-cat-1.gif";

import { TimerContext } from "../../context/TimerContext";

function TimerPage() {
  const [task, setTask] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  let timerStatus = new TimerStatus(false, 0);

  useEffect(() => {
    console.log("Timer status changed: ", timerStatus);
  }, [timerStatus]);

  return (
    <TimerContext.Provider value={timerStatus}>
      <Flex direction={"row"} py={20} px={40} gap={20}>
        <Flex direction={"column"} flex={1}>
          <TaskInput
            task={task}
            setTask={setTask}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
          {/* <Image className={classes.sleepyBreathing} w={300} h={300} src={BongoCat} /> */}
        </Flex>
        <TodoList  setTask={setTask} />
      </Flex>
    </TimerContext.Provider>
  );
}

export default TimerPage;
