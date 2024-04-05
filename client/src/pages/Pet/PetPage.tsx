import { useEffect, useState } from "react";
import { Text, Flex, Space } from "@mantine/core";
import { NavbarSimple } from "../../components/NavbarSimple";
import { Pet } from "../../classes/models";
import { getCoins, getPet } from "../../classes/HTTPhelpers";

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
    <Flex direction={'row'} gap={30}>
      <NavbarSimple active={active} setActive={setActive} />
      <Flex direction={'column'}>
        <Text>The pet stuff is under construction. Come back after the checkpoint.</Text>
        <Text>Pet Data:</Text>
        <Text>{JSON.stringify(petData)}</Text>
        <Space h={30}/>
        <Text>Total Coins:</Text>
        <Text>{JSON.stringify(coins)}</Text>
      </Flex>
    </Flex>
  );
}

export default PetPage