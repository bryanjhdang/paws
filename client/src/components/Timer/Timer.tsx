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
} from "@mantine/core";

export function Timer(): JSX.Element {
  /* ---------------------------------- State --------------------------------- */
  const [timerSliderValue, setTimerSliderValue] = useState<number>(0);
  const [timerProgressTextValue, setTimerProgressTextValue] =
    useState<string>(`0:00`);
  const [timerProgressWheelValue, setTimerProgressWheelValue] =
    useState<number>(0);
  const [timerProgressWheelRounding, setTimerProgressWheelRounding] =
    useState<boolean>(false);

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

    // reverse the conversion
    value = seconds / 60;

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

    setTimerProgressTextValue(convertSecondsToProgressTextValue(seconds));
    setTimerSliderValue(value);
    setTimerProgressWheelValue(value);
  }
  function handleTimerStartButton(): void {
    console.log("Timer Started");
  }

  /* ------------------------------- Components ------------------------------- */
  function timerToolTip(): JSX.Element {
    return (
      <>
        <Text size="sm" c={"grey"}>
          minutes:seconds
        </Text>
      </>
    );
  }
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
                {timerToolTip()}
              </Flex>
            </Center>
          }
        />
      </>
    );
  }
  function timerSlider(): JSX.Element {
    const stepValue: number = 5;
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

        {/* TODO: transition animation to stop/pause buttons */}
        {timerSlider()}
        <Space h={50} />
        {timerStartButton()}
      </Flex>
    </>
  );
}
