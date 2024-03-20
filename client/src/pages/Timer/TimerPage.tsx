import { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { TaskInput } from "./TaskInput";
import { Timer } from "./Timer";
import { Project, TimeEntry } from "../../classes/models";

function TimerPage() {
  const [task, setTask] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [active, setActive] = useState<string>("Timer");

  interface SubmitTimeEntryProps {
    task: string;
    selectedProject: Project;
  }
  
  const createTimeEntry = ({ task, selectedProject } : SubmitTimeEntryProps ): void => {
    console.log(task + selectedProject);
    // Make a time entry here
  }

  return (
    <>
      <Flex direction={"row"}>
        <NavbarSimple active={active} setActive={setActive} />
        <Flex direction={"column"} flex={1}>
          <TaskInput 
            task={task}
            setTask={setTask}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
          <Timer />
          {/* The START button should be here -> should start the timer as well as make a POST reqeust to the backend giving a TimeEntry */}
        </Flex>
      </Flex>
    </>
  );
}

export default TimerPage;
