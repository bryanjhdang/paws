import { useEffect, useState } from "react";
import { Text, Flex, Space, Stack, Divider, Group } from "@mantine/core";
import { Pet } from "../../classes/models";
import { getCoins, getPet } from "../../classes/HTTPhelpers";
import { TextHeader } from "../../components/Headers";
import StoreItem from "./StoreItem";
import classes from "./StorePage.module.css";
import { IconCoin } from '@tabler/icons-react';

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
        console.log(response);
        setCoins(response);
      }
    )
  }, []);

  return (
    <Stack>
      <TextHeader text="Store" />

      <Group gap={5} className={classes.coinsAmount}>
        <IconCoin stroke={1} />
        <Text>{coins}</Text>
      </Group>

      <Flex direction={"column"} className={classes.section}>
        <Text className={classes.sectionTitle}>Rest Cats</Text>
        <Text>These are the cats you'll see when you're not using the timer! They're taking a break, too.</Text>
      </Flex>

      {/* Display all sleep cats */}

      <StoreItem />

      <Flex direction={"column"} className={classes.section}>
        <Text className={classes.sectionTitle}>Work Cats</Text>
        <Text className={classes.sectionText}>These cats are hard at work. Whenever the timer is on, they work alongside you!</Text>
      </Flex>

      {/* Display all work cats */}
    </Stack>
  );
}

export default StorePage