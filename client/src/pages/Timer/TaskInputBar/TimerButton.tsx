import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconPlayerPlayFilled } from "@tabler/icons-react";

import { Timer } from "./Timer";

import { Project } from "../../../classes/models";
import { useTimerContext } from "../../../context/TimerContext";
import { useEffect, useRef, useState } from "react";

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

  return (
    <>
      <Button variant="light" radius={"lg"} onClick={open}>
        {timerContext.getIsRunning() ? timeRemaining : <IconPlayerPlayFilled size={20} />}
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
