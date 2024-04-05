import { useState } from "react";
import { Flex, ScrollArea } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { TaskInput } from "./TaskInput";
import { Timer } from "./Timer";
import { Project } from "../../classes/models";

function TimerPage() {
  const [task, setTask] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [active, setActive] = useState<string>("Timer");

  return (
    <>
      <Flex direction={"row"} gap={50}>
        <NavbarSimple active={active} setActive={setActive} />
        <Flex direction={"column"} flex={1}>
          <TaskInput
            task={task}
            setTask={setTask}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
          <Timer
            task={task}
            selectedProject={selectedProject}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default TimerPage;
