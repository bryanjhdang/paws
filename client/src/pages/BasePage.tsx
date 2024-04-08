import { Flex } from "@mantine/core";
import { useState } from "react";
import { NavbarSimple } from "../components/NavbarSimple";

interface BasePageProps {
  children: React.ReactNode;
  pageName: string;
}

export default function BasePage({ children, pageName }: BasePageProps) {
  const [active, setActive] = useState<string>(pageName);
  
  return (
    <Flex direction={"row"}>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex py={20} px={40} direction={"column"} flex={1}>
        {children}
      </Flex>
    </Flex>
  )
}