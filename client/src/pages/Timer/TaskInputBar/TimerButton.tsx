import { useEffect, useRef, useState } from "react";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useAuth0 } from "@auth0/auth0-react";

import { IconAlarm } from "@tabler/icons-react";

import { Timer } from "./Timer";

import { Project } from "../../../classes/models";
import { useTimerContext } from "../../../context/TimerContext";
import { getAccount } from "../../../classes/HTTPhelpers";

interface TimerProps {
  task: string;
  selectedProject: Project | null;
}

export function TimerButton({
  task,
  selectedProject,
}: TimerProps): JSX.Element {
  /* ---------------------------------- state --------------------------------- */
  const [timeRemaining, setTimeRemaining] = useState<string>("Starting...");

  const [opened, { open, close }] = useDisclosure();
  const timerContext = useTimerContext();

  /* ----------------------------- timer lifecycle ---------------------------- */
  // setting the timer up
  const intervalReference = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timerContext.getIsRunning()) {
      intervalReference.current = setInterval(() => {
        if (timerContext.getTimeRemaining() > 0) {
          timerContext.setTimeRemaining(timerContext.getTimeRemaining() - 1);
          setTimeRemaining(
            timerContext.getTimeRemainingConverted(
              timerContext.getTimeRemaining()
            )
          );

          if (timerContext.getTimeRemaining() === 0) {
            clearInterval(intervalReference.current as NodeJS.Timeout);
            timerContext.setIsRunning(false);
            setTimeRemaining("Starting...");
          }
        } else {
          clearInterval(intervalReference.current as NodeJS.Timeout);
          timerContext.setIsRunning(false);
          setTimeRemaining("Starting...");
        }
      }, 1000);
    } else {
      clearInterval(intervalReference.current as NodeJS.Timeout);
      timerContext.setIsRunning(false);
      setTimeRemaining("Starting...");
    }
  }, [timerContext.getIsRunning()]);

  // resuming the timer on reload if it was running
  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userId = user?.sub || "invalid user";

        getAccount(userId, token).then((response) => {
          if (response.runningTime.plannedEndTime) {
            if (Date.now() < response.runningTime.plannedEndTime) {
              const timeRemaining = Math.floor(
                (response.runningTime.plannedEndTime - Date.now()) / 1000
              );
                console.log("one");
                timerContext.setTimeRemaining(timeRemaining);
                timerContext.setIsRunning(true);
                console.log("two")
            } else {
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <Button variant="light" radius={"lg"} color="black" onClick={open}>
        {timerContext.getIsRunning() ? timeRemaining : <IconAlarm />}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        size={"auto"}
        transitionProps={{
          // transition: "rotate-right"
          transition: "pop-top-right",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Timer task={task} selectedProject={selectedProject} />
      </Modal>
    </>
  );
}
