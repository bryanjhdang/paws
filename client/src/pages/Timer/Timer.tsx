import { useState } from "react";

import { Flex, Box, TextInput, Divider, Text, ActionIcon, Slider, Space, Title, Button, Transition } from "@mantine/core";
import { IconFolderOpen, IconTag } from "@tabler/icons-react";

import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function TimerPage() {
    const [active, setActive] = useState('Timer');
    const [task, setTask] = useState('');
    const [timer, setTimer] = useState('0:00');


    // event handlers
    function handleProjectIconClick(): void {
        console.log("project icon clicked");
    }
    function handleTagIconClick(): void {
        console.log("tag icon clicked");
    }
    function handleSliderChange(value: number): void {
        let hours = Math.floor(value / 100);
        let minutes = (value % 100) * 0.6;
        let time = `${hours.toString()}:${Math.round(minutes).toString().padStart(2, '0')}`;
        setTimer(time);
    }
    function handleTimerStart(): void {
        console.log("timer started");
    }
    function handleTimerStop(): void {
        console.log("timer stopped");
    }

    // components
    function taskBoxButton(icon: JSX.Element, onClick: Function): JSX.Element {
        return (
            <>
                <ActionIcon
                    variant="default"
                    size="xl"
                    onClick={() => onClick()}
                >
                    {icon}
                </ActionIcon>
            </>
        );
    }

    function taskBoxRow(): JSX.Element {
        return (
            <>
                <Flex
                    direction={"row"}
                    align={"center"}
                >
                    <TextInput
                        size="xl"
                        variant="unstyled"
                        placeholder={"What are you working on?"}
                        pr={10}
                        w={"100%"}
                        value={task}
                        onChange={(event) => setTask(event.currentTarget.value)}
                    />
                    <Flex gap={5}>
                        {taskBoxButton(<IconFolderOpen />, handleProjectIconClick)}
                        {taskBoxButton(<IconTag />, handleTagIconClick)}
                    </Flex>
                </Flex>
            </>
        );
    }

    function timerDisplay(): JSX.Element {
        return (
            <>
                <Title
                    order={1}
                    size={100}
                >
                    <Text
                        inherit
                        span
                        fw={900}
                        variant='gradient'
                        gradient={{
                            from: 'rgba(255, 157, 71, 1)',
                            to: 'rgba(252, 210, 96, 1)',
                            deg: 90
                        }}
                    >
                        {timer}
                    </Text>
                </Title>

                <Text size="sm" c={"grey"}>
                    hour:minutes
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
                    onChange={(value) => handleSliderChange(value)}
                    marks={[
                        { value: 0, label: "0:00" },
                        { value: 25, label: "0:15" },
                        { value: 50, label: "0:30" },
                        { value: 75, label: "0:45" },
                        { value: 100, label: "1:00" }
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
                        from: 'yellow',
                        to: 'orange',
                        deg: 90
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
                        from: 'red',
                        to: 'orange',
                        deg: 90
                    }}
                >
                    STOP
                </Button>
            </>
        );
    }

    return (
        <>
            <Flex direction={"row"}>
                <NavbarSimple active={active} setActive={setActive} />

                {/* Main Content */}
                <Flex direction={"column"} justify={"flex-start"} align={"center"} flex={1}>
                    {/* task header */}
                    <Box p={10} w={"100%"}>
                        {taskBoxRow()}
                        <Divider mt={2} label={"i hate frontend dev kms"} labelPosition={"right"} />
                    </Box>

                    <Flex direction={"column"} justify={"center"} align={"center"} w={"100%"} flex={1}>
                        {/* timer */}
                        {timerDisplay()}

                        <Space h={"md"} />

                        {timerSlider()}
                        <Space h={"xl"} />
                        {timerStartButton()}
                    </Flex>

                </Flex>
            </Flex>
        </>
    );
}

export default TimerPage;