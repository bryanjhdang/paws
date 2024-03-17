import { useState } from "react";
import { Center, Flex, Text, Group, Space} from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function TimerPage() {
    const [active, setActive] = useState('Timer');

    return (
        <Flex>
            <Flex direction={"row"}>
                <NavbarSimple active={active} setActive={setActive} />

                <Flex direction={"column"} justify={"flex-start"} align={"center"} style={{ flex: 1 }}>
                    <Text>Changes go here</Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default TimerPage;