import { useState } from "react";
import { Flex } from "@mantine/core";
import { NavbarSimple } from "../../components/Navbar/NavbarSimple";
import { TaskInput } from "./TaskInput";
import { Timer } from "./Timer";

function TimerPage() {
  const [active, setActive] = useState<string>("Timer");

  return (
    <>
      <Flex direction={"row"}>
        <NavbarSimple active={active} setActive={setActive} />
        <Flex direction={"column"} flex={1}>
          <TaskInput />
          <Timer />
        </Flex>
      </Flex>
    </>
  );
}

export default TimerPage;
