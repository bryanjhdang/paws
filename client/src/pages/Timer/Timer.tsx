import { useState } from "react";

import { Flex, Box, TextInput, Divider, Grid, ActionIcon, Group } from "@mantine/core";
import { IconFolderOpen, IconTag } from "@tabler/icons-react";

import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function TimerPage() {
    const [active, setActive] = useState('Timer');

    function taskBoxButton(icon: JSX.Element): JSX.Element {
        return (
            <>
                <ActionIcon
                    variant="default"
                    size="xl"
                >
                    {icon}
                </ActionIcon>
            </>
        );
    }

    function taskBoxInput(): JSX.Element {
        return (
            <>
                <TextInput
                    size="xl"
                    variant="unstyled"
                    placeholder={"What are you working on?"}
                    pr={10}
                    style={{ width: "100%" }}
                />
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
                    {taskBoxInput()}
                    <Flex gap={5}>
                        {taskBoxButton(<IconFolderOpen/>)}
                        {taskBoxButton(<IconTag/>)}
                    </Flex>
                </Flex>
            </>
        );
    }

    function taskBox() {
        return (
            <>
                <Box p={10} style={{ width: "100%" }}>
                    {taskBoxRow()}
                    <Divider mt={2} label={"i hate frontend dev kms"} labelPosition={"right"} />
                </Box>
            </>
        );
    }

    return (
        <>
            <Flex direction={"row"}>
                <NavbarSimple active={active} setActive={setActive} />

                {/* Main Content */}
                <Flex direction={"column"} justify={"flex-start"} align={"center"} style={{ flex: 1 }}>
                    {taskBox()}
                </Flex>
            </Flex>
        </>
    );
}

export default TimerPage;