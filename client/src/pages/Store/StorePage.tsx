import { useEffect, useState } from "react";
import { Text, Flex, Stack, Group, Divider } from "@mantine/core";
import { Pet } from "../../classes/models";
import { getCoins, getPet } from "../../classes/HTTPhelpers";
import { TextHeader } from "../../components/Headers";
import StoreItem from "./StoreItem";
import classes from "./StorePage.module.css";
import { IconCoin } from '@tabler/icons-react';
import { RestCats, WorkCats } from "../../classes/shopItems";

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

  const handleBuyItem = () => {

  }

  return (
    <Stack>
      <TextHeader text="Store" />

      {/* <Group gap={5} className={classes.coinsAmount}>
        <IconCoin stroke={1} />
        <Text>{coins}</Text>
      </Group> */}

      <Flex direction={"column"} className={classes.section}>
        <Text className={classes.sectionTitle}>Rest Cats</Text>
        <Text>When you're not working, they aren't either. Sometimes cats need a break too.</Text>
      </Flex>

      <Group mb={50}>
        {RestCats.map((catItem, index) => (
          <StoreItem key={index} catItem={catItem} />
        ))}
      </Group>

      <Divider />

      <Flex mt={50} direction={"column"} className={classes.section}>
        <Text className={classes.sectionTitle}>Work Cats</Text>
        <Text className={classes.sectionText}>These cats are hard at work. Whenever the timer is on, they work alongside you!</Text>
      </Flex>

      <Group mb={50}>
        {WorkCats.map((catItem, index) => (
          <StoreItem key={index} catItem={catItem} />
        ))}
      </Group>
    </Stack>
  );
}

export default StorePage