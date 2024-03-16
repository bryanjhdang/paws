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

  // components
  function timerDisplay(): JSX.Element {
    return (
      <>
        <RingProgress
          size={600}
          thickness={30}
          roundCaps
          sections={[
            { value: timerValueDecimal, color: "rgba(255, 157, 71, 1)" },
          ]}
          label={
            <Center>
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                w={"100%"}
                flex={1}
              >
                <Title order={1} size={100}>
                  <Text
                    inherit
                    span
                    fw={900}
                    variant="gradient"
                    gradient={{
                      from: "rgba(255, 157, 71, 1)",
                      to: "rgba(252, 210, 96, 1)",
                      deg: 90,
                    }}
                  >
                    {timerValue}
                  </Text>
                </Title>
              </Flex>
            </Center>
          }
        />

        <Text size="sm" c={"grey"}>
          hours:minutes
        </Text>
      </>
    );
  }
  function timerSlider(): JSX.Element {
    return (
      <>
        <Slider
          w={"60%"}
          showLabelOnHover={false}
          color={"#f1d179"}
          onChange={(value) => handleSliderChange(value)}
          step={25}
          marks={[
            { value: 0, label: "0:00" },
            { value: 25, label: "30 minutes" },
            { value: 50, label: "60 minutes" },
            { value: 75, label: "90 minutes" },
            { value: 100, label: "120 minutes" },
          ]}
        />
      </>
    );
  }
  function timerStartButton(): JSX.Element {
    return (
      <>
        <Button
          size="xl"
          onClick={handleTimerStart}
          variant="gradient"
          gradient={{
            from: "yellow",
            to: "orange",
            deg: 90,
          }}
        >
          START
        </Button>
      </>
    );
  }
  function timerStopButton(): JSX.Element {
    return (
      <>
        <Button
          size="xl"
          onClick={handleTimerStop}
          variant="gradient"
          gradient={{
            from: "red",
            to: "pink",
            deg: 90,
          }}
        >
          STOP
        </Button>
      </>
    );
  }
  function timer(): JSX.Element {
    return (
      <>
        {timerDisplay()}
        <Space h={"md"} />

        <Transition
          mounted={mountTimerSetButtons}
          transition={"slide-down"}
          duration={200}
          timingFunction="ease"
          keepMounted
        >
          {(transitionStyle) => (
            <Flex
              style={{ ...transitionStyle, zIndex: 1 }}
              w={"100%"}
              justify={"center"}
              align={"center"}
              p={10}
              direction={"column"}
            >
              {timerSlider()}
              <Space h={"xl"} />
              {timerStartButton()}
            </Flex>
          )}
        </Transition>

        <Transition
          mounted={!mountTimerSetButtons}
          transition={"slide-up"}
          duration={200}
          timingFunction="ease"
          keepMounted
        >
          {(transitionStyle) => (
            <Flex
              style={{ ...transitionStyle, zIndex: 1 }}
              w={"100%"}
              justify={"center"}
              align={"center"}
              p={10}
              direction={"column"}
            >
              {timerStopButton()}
            </Flex>
          )}
        </Transition>
      </>
    );
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
          {/* task header */}
          <Box p={10} w={"100%"}>
            <TaskInput />
          </Box>

          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            flex={1}
          >
            <Timer />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default TimerPage;
