import { useState } from "react";

import {
  Flex,
  Box,
  Text,
  Slider,
  Space,
  Title,
  Button,
  Transition,
  RingProgress,
  Center,
} from "@mantine/core";

import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { TaskInput } from "../../components/TaskInput/TaskInput";
import { Timer } from "../../components/Timer/Timer";

function TimerPage() {
  const [active, setActive] = useState<string>("Timer");

  const [timerValue, setTimerValue] = useState<string>("0:00");
  const [timerValueDecimal, setTimerValueDecimal] = useState<number>(0);
  const [timerValueMilliseconds, setTimerValueMilliseconds] = useState<number>(0);
  const [stopTimerFunction, setStopTimerFunction] = useState<Function>(
    () => {}
  );

  const [mountTimerSetButtons, setMountTimerSetButtons] =
    useState<boolean>(true);

  // event handlers
  function calculateTimerMilliseconds(hour: number, minute: number): number {
    let milliseconds: number = (hour * 60 + minute) * 60 * 1000;
    return milliseconds;
  }
  function calculateTimerDecimal(hour: number, minute: number): number {
    let decimal = ((hour * 60) + minute) / 120 * 2;
    return decimal;
  }
  function convertSliderValueToMinutes(value: number): string {
    let time: string = ``;

    // convert decimal to hour and minute
    let hour: number = Math.floor((value * 120) / 100);
    let minute: number = Math.floor(((value * 120) / 100 - hour) * 60);
    time = `${hour}:${minute < 10 ? "0" + minute : minute}`;

    // convert to milliseconds
    setTimerValueMilliseconds(calculateTimerMilliseconds(hour, minute));

    // convert to a decimal out of 100
    setTimerValueDecimal(calculateTimerDecimal(hour, minute));

    return time;
  }
  function handleSliderChange(value: number): void {
    setTimerValue(convertSliderValueToMinutes(value));
  }
  async function handleTimerStart(): Promise<void> {
    console.log("timer started");
    setMountTimerSetButtons(false);

    // timerValueMilliseconds is how long the timer should run in milliseconds
    // timerValueDecimal is the percentage of the ring progress

  }
  async function handleTimerStop(): Promise<void> {
    console.log("timer stopped");

    setMountTimerSetButtons(true);
  }

  return (
    <>
      <Flex direction={"row"}>
        <NavbarSimple active={active} setActive={setActive} />

        {/* Main Content */}
        <Flex
          direction={"column"}
          justify={"flex-start"}
          align={"center"}
          flex={1}
        >
            <TaskInput />
            <Timer />
          
        </Flex>
      </Flex>
    </>
  );
}

export default TimerPage;
