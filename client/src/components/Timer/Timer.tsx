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

  const [timerProgressTextValue, setTimerProgressTextValue] = useState<string>(`0:00`);
  
  const [timerProgressWheelValue, setTimerProgressWheelValue] =
    useState<number>(0);
    const [timerProgressWheelRounding, setTimerProgressWheelRounding] = useState<boolean>(false);

  /* ---------------------------- Helper Functions ---------------------------- */


  /* ----------------------------- Event Handlers ----------------------------- */
  function handleTimerSlider(value: number): void {
    if (value !== 0) {
        setTimerProgressWheelRounding(true);
    } else {
        setTimerProgressWheelRounding(false);
    }

    setTimerProgressTextValue(value.toString());
    setTimerSliderValue(value);
    setTimerProgressWheelValue(value);
  }
  function handleTimerStartButton(): void {}

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
    return (
      <>
        <Slider
          w={"60%"}
          showLabelOnHover={false}
          color={"#f1d179"}
          onChange={(value) => handleTimerSlider(value)}
          // step={25} // this makes the slider jump in increments of 25 (each half hour)
          marks={[
            { value: 0, label: "0 minutes" },
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
        {timerSlider()}

        <Space h={50} />

        {timerStartButton()}
      </Flex>
    </>
  );
}
