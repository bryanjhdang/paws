import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconAlarm } from "@tabler/icons-react";

import { Timer } from "./Timer";

import { Project } from "../../../../classes/models";
import {
  TimerContext,
  useTimerContext,
} from "../../../../context/TimerContext";
import { useContext } from "react";

interface TimerProps {
  task: string;
  selectedProject: Project | null;
}

export function TimerButton({
  task,
  selectedProject,
}: TimerProps): JSX.Element {
  /* ---------------------------------- state --------------------------------- */
  const [opened, { open, close }] = useDisclosure();

  // contains the status about the running timer.
  // two fields: isRunning (.getIsRunning(): boolean) and timeRemaining (.getTimeRemaining(): string)
  const timerContext = useTimerContext();

  return (
    <>
      <Button variant="light" radius={"lg"} color="black" onClick={open}>
        {timerContext.getIsRunning() ? (
          timerContext.getTimeRemaining()
        ) : (
          <IconAlarm />
        )}
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
        title="Set a Timer"
      >
        <Timer task={task} selectedProject={selectedProject} />
      </Modal>
    </>
  );
}
