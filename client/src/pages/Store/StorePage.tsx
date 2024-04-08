import { useEffect, useState } from "react";
import { Text, Flex, Space, Stack } from "@mantine/core";
import { Pet } from "../../classes/models";
import { getCoins, getPet } from "../../classes/HTTPhelpers";
import { TextHeader } from "../../components/Headers";

function StorePage() {
  // const [storeItems, setStoreItems] = useState<>
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
    <>
      <TextHeader text="Store" />
      <Text>TODO: Display coins, items, and pet icon.</Text>
      <Text>Pet Data:</Text>
      <Text>{JSON.stringify(petData)}</Text>
      <Space h={30} />
      <Text>Total Coins:</Text>
      <Text>{JSON.stringify(coins)}</Text>
    </>
  );
}

export default StorePage