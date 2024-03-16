import { useState, useEffect } from "react";
import {
  RingProgress,
  Title,
  Text,
  Slider,
  Center,
  Flex,
  Button,
  Space,
  Transition,
  ActionIcon,
} from "@mantine/core";
import {
  IconPlayerStop,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";

export function Timer(): JSX.Element {
  /* ---------------------------------- State --------------------------------- */
  const [timerValue, setTimerValue] = useState<number>(0); // in seconds
  const [timerProgressTextValue, setTimerProgressTextValue] =
    useState<string>(`0:00`);
  const [timerProgressWheelValue, setTimerProgressWheelValue] =
    useState<number>(0);
  const [timerProgressWheelRounding, setTimerProgressWheelRounding] =
    useState<boolean>(false);

  const [mountTimerInput, setMountTimerInput] = useState<boolean>(true);
  const [timerPaused, setTimerPaused] = useState<boolean>(false);

  /* ---------------------------- Helper Functions ---------------------------- */
  function convertSliderValueToSeconds(value: number): number {
    let seconds: number = 0;

    // the slider supports all 120 minutes, therefore just multiply by 60
    seconds = value * 60;

    return seconds;
  }
  function convertSecondsToProgressTextValue(seconds: number): string {
    // we take the floor of the seconds divided by 60 to get the minutes
    // we take the remainder of the seconds divided by 60 to get the remaining seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // padStart is used to ensure that the string str is at least 2 characters long.
    // If str is less than 2 characters long, padStart will add "0"s to the start of str
    // until it is 2 characters long. this is for seconds < 10
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }
  function convertSecondsToProgressWheelValue(seconds: number): number {
    let value: number = 0;

    /* 
        ring progress value to minutes mapping (as ring only goes up to 100)
        0 -> 0
        25 -> 30 minutes
        50 -> 60 minutes
        75 -> 90 minutes
        100 -> 120 minutes
        therefore slider value to seconds and milliseconds mapping is:
        0 -> 0
        25 -> 1800 seconds -> 1800000 milliseconds
        50 -> 3600 seconds -> 3600000 milliseconds
        75 -> 5400 seconds -> 5400000 milliseconds
        100 -> 7200 seconds -> 7200000 milliseconds
    */
    // formula to convert slider value to seconds
    //seconds = Math.floor((value / 100) * 7200);
    value = (seconds / 7200) * 100;

    return value;
  }

  /* ----------------------------- Event Handlers ----------------------------- */
  function handleTimerSlider(value: number): void {
    // if rounding is enabled, it shows even when the value is 0
    // therefore we need to disable it when the value is 0
    if (value !== 0) {
      setTimerProgressWheelRounding(true);
    } else {
      setTimerProgressWheelRounding(false);
    }

    let seconds = convertSliderValueToSeconds(value);
    setTimerValue(seconds);
    setTimerProgressTextValue(convertSecondsToProgressTextValue(seconds));
    setTimerProgressWheelValue(convertSecondsToProgressWheelValue(seconds));
  }
  function handleTimerStartButton(): void {
    console.log(
      "Timer Started for " + convertSecondsToProgressTextValue(timerValue)
    );
    setMountTimerInput(false);
  }
  function handleTimerStopButton(): void {
    console.log("Timer Stopped");
    setMountTimerInput(true);
  }
  function handleTimerPauseButton(): void {
    console.log(timerPaused ? "Timer Resumed" : "Timer Paused");
    setTimerPaused(!timerPaused);
  }

  /* ------------------------------- Components ------------------------------- */
  function timerProgressText(): JSX.Element {
    return (
      <>
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
            {timerProgressTextValue}
          </Text>
        </Title>
      </>
    );
  }
  function timerStartButton(): JSX.Element {
    return (
      <>
        <Button
          size="xl"
          w={"50%"}
          onClick={handleTimerStartButton}
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
        <ActionIcon
          variant="default"
          bg={"red"}
          size="xl"
          onClick={handleTimerStopButton}
        >
          <IconPlayerStop />
        </ActionIcon>
      </>
    );
  }
  function timerPauseButton(): JSX.Element {
    return (
      <>
        <ActionIcon
          variant="default"
          bg={"cyan"}
          size="xl"
          onClick={handleTimerPauseButton}
        >
          {timerPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
        </ActionIcon>
      </>
    );
  }
  function timerProgressWheel(): JSX.Element {
    return (
      <>
        <RingProgress
          size={600}
          thickness={30}
          roundCaps={timerProgressWheelRounding}
          sections={[
            { value: timerProgressWheelValue, color: "rgba(255, 157, 71, 1)" },
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
                {timerProgressText()}

                <Transition
                  mounted={!mountTimerInput}
                  transition={"slide-down"}
                  duration={500}
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
                      direction={"row"}
                      gap={10}
                    >
                      {timerStopButton()}
                      {timerPauseButton()}
                    </Flex>
                  )}
                </Transition>
              </Flex>
            </Center>
          }
        />
      </>
    );
  }
  function timerSlider(): JSX.Element {
    const maxValue: number = 120;
    const marks = [
      { value: 0, label: "0 minutes" },
      { value: 5, label: "" },
      { value: 10, label: "" },
      { value: 15, label: "" },
      { value: 20, label: "" },
      { value: 25, label: "" },
      { value: 30, label: "30 minutes" },
      { value: 35, label: "" },
      { value: 40, label: "" },
      { value: 45, label: "" },
      { value: 50, label: "" },
      { value: 55, label: "" },
      { value: 60, label: "60 minutes" },
      { value: 65, label: "" },
      { value: 70, label: "" },
      { value: 75, label: "" },
      { value: 80, label: "" },
      { value: 85, label: "" },
      { value: 90, label: "90 minutes" },
      { value: 95, label: "" },
      { value: 100, label: "" },
      { value: 105, label: "" },
      { value: 110, label: "" },
      { value: 115, label: "" },
      { value: 120, label: "120 minutes" },
    ];

    return (
      <>
        <Slider
          w={"60%"}
          showLabelOnHover={false}
          color={"#f1d179"}
          onChange={(value) => handleTimerSlider(value)}
          max={maxValue}
          marks={marks}
        />
      </>
    );
  }

  return (
    <>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        w={"100%"}
        flex={1}
      >
        {timerProgressWheel()}

        <Transition
          mounted={mountTimerInput}
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
              direction={"column"}
            >
              {timerSlider()}
              <Space h={40} />
              {timerStartButton()}
            </Flex>
          )}
        </Transition>
      </Flex>
    </>
  );
}
