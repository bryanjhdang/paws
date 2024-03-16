import { useState } from "react";
import { Text, Flex, Group, Center, alpha } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";

function TimerPage() {
    const [active, setActive] = useState('Timer');

    return (
        <>
            <Flex direction={"row"}>
                <NavbarSimple active={active} setActive={setActive} />
                
                <Flex bg={"rgba(0, 120, 120, 0.5)"} direction={"column"} align={"center"} justify={"flex-start"} style={{ flex: 1 }}>
                    
                </Flex>
            </Flex>
        </>
    );
}

export default TimerPage;