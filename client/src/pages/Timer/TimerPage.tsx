import { useState } from "react";
import { Flex, Image, ScrollArea, Stack } from "@mantine/core";
import { TaskInput } from "./TaskInput";
import { Timer } from "./Timer";
import { Project } from "../../classes/models";
import TodoList from "./TodoList";
import classes from "./TimerPage.module.css";
import BongoCat from "../../assets/sleepy-cat-1.gif";

function TimerPage() {
  const [task, setTask] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <>
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
    </>
  );
}

export default TimerPage;
