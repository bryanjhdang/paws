import { useEffect, useState } from "react";
import { Text, Flex, Space, Stack } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { Pet } from "../../classes/models";
import { getCoins, getPet } from "../../classes/HTTPhelpers";
import { TextHeader } from "../../components/Headers";

function PetPage() {
  const [active, setActive] = useState('Pet')
  const [petData, setPetData] = useState<Pet>();
  const [coins, setCoins] = useState<number>();

  useEffect(() => {
    getPet().then(
      (response) => {
        setPetData(response);
      }
    );
    getCoins().then(
      (response) => {
        setCoins(response);
      }
    )
  }, []);

  return (
    <Flex direction={'row'} gap={50}>
      <NavbarSimple active={active} setActive={setActive} />
      <Stack>
        <TextHeader text="Pet" />
        <Text>The pet stuff is under construction. Come back after the checkpoint.</Text>
        <Text>Pet Data:</Text>
        <Text>{JSON.stringify(petData)}</Text>
        <Space h={30} />
        <Text>Total Coins:</Text>
        <Text>{JSON.stringify(coins)}</Text>
      </Stack>
    </Flex>
  );
}

export default PetPage