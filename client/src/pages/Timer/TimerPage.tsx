import { useState, useEffect } from "react";
import { Flex, Image } from "@mantine/core";
import { TaskInput } from "./TaskInputBar/TaskInput";
import { Pet, Project, TimerStatus } from "../../classes/models";
import TodoList from "./Todo/TodoList";
import SocketConnection from "./SocketConnection/SocketConnection";
import { Timer } from "./TaskInputBar/Timer";
<<<<<<< HEAD
import { TimerContext, useTimerContext } from "../../context/TimerContext";
=======
import { TimerContext } from "../../context/TimerContext";
>>>>>>> 0ebff45defbd1ec37599566d8f3c040ebcb99c1d
import { useAuth0 } from "@auth0/auth0-react";
import { getAccount } from "../../classes/HTTPhelpers";
import { getPathById } from "../../classes/shopItems";
import classes from "./TimerPage.module.css";
<<<<<<< HEAD
=======
import { PageLoader } from "../../components/PageLoader";
>>>>>>> 0ebff45defbd1ec37599566d8f3c040ebcb99c1d

function TimerPage() {
  const [task, setTask] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();
  let timerStatus = new TimerStatus(false, 0);

  const [pet, setPet] = useState<Pet>();
  const [startTime, setStartTime] = useState<number | undefined>();
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(true);
>>>>>>> 0ebff45defbd1ec37599566d8f3c040ebcb99c1d

  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userId = user?.sub || "not logged in";

        getAccount(userId, token).then(
          (response) => {
<<<<<<< HEAD
            console.log(response);
            setPet(response.pet);
            setStartTime(response.runningTime.startTime);
            setTask(response.runningTime.name);
=======
            setPet(response.pet);
            setStartTime(response.runningTime.startTime);
            setTask(response.runningTime.name);
            setLoading(false);
>>>>>>> 0ebff45defbd1ec37599566d8f3c040ebcb99c1d
          }
        )
      } catch (error) {
        console.error(error);
      }
    };

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently, user?.sub]);

<<<<<<< HEAD
=======
  if (loading) return <PageLoader/>

>>>>>>> 0ebff45defbd1ec37599566d8f3c040ebcb99c1d
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

          <div className={classes.img}>
            {pet && (
              startTime === undefined ? (
                <Image className={classes.restAnim} w={400} h={400} src={getPathById(true, pet.restId)} />
              ) : (
                <Image className={classes.workAnim} w={400} h={400} src={getPathById(false, pet.workId)} />
              )
            )}
          </div>

        </Flex>
        <Flex direction={"column"} gap={20}>
<<<<<<< HEAD
            {/* <Timer task={task} selectedProject={selectedProject} setStart={setStartTime} /> */}
=======
            <Timer task={task} selectedProject={selectedProject} setStart={setStartTime} />
>>>>>>> 0ebff45defbd1ec37599566d8f3c040ebcb99c1d
          <TodoList setTask={setTask} />
          <SocketConnection />
        </Flex>
      </Flex>
    </TimerContext.Provider>
  );
}

export default TimerPage;
