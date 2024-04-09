import { useEffect, useState } from "react";
import { Text, Flex, Stack, Group, Divider } from "@mantine/core";
import { Pet } from "../../classes/models";
import { buyPet, equipPet, getCoins, getPet } from "../../classes/HTTPhelpers";
import { FunctionalHeader } from "../../components/Headers";
import StoreItem from "./StoreItem";
import classes from "./StorePage.module.css";
import { IconCoin } from '@tabler/icons-react';
import { RestCats, WorkCats } from "../../classes/shopItems";
import { notifications } from "@mantine/notifications";

function StorePage() {
  // const [storeItems, setStoreItems] = useState<>
  const [pets, setPets] = useState<Pet>();
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    getPet("nemLmP1npemf5VSzAKRC").then(
      (response) => {
        setPets(response);
        console.log(response);
      }
    );
    getCoins("nemLmP1npemf5VSzAKRC").then(
      (response) => {
        setCoins(response);
      }
    )
  }, []);

  const handleBuyItem = (id: number, cost: number) => {
    // This should never be called
    if (pets && pets.ownedCats.includes(id)) {
      return;
    }

    if (cost > coins) {
      notifications.show({
        title: "Unable to Purchase",
        message: "You don't have enough coins!",
        color: "red",
        withBorder: true
      });
      return;
    }

    buyPet(id, cost).then(() => {
      if (pets) {
        const updatedOwned = [...pets.ownedCats, id];
        setPets(new Pet(pets.restId, pets.workId, updatedOwned));
        notifications.show({
          message: "Purchased!",
          color: "green",
          withBorder: true
        })
      }
      setCoins(prevCoins => prevCoins - cost);
    }).catch(error => {
      console.error("Purchase failed:", error);
      alert("Failed to purchase item.");
    });
  }

  const handleEquipItem = (pet: Pet) => {
    equipPet(pet).then(() => {
      if (pets) {
        const updatedPets = [pet]
      }
    })
  }

  const coinDisplay = () => {
    return (
      <Group className={classes.coinDisplay} gap={10}>
        <IconCoin stroke={1.5} />
        <Text>{coins}</Text>
      </Group>
    )
  }

  return (
    <>
      <FunctionalHeader text="Store" element={coinDisplay()} />
      <Stack p={40}>
        <Flex direction={"column"} className={classes.section}>
          <Text className={classes.sectionTitle}>Rest Cats</Text>
          <Text>When you're not working, they aren't either. Sometimes cats need a break too.</Text>
        </Flex>

        <Group mb={50}>
          {RestCats.map((catItem, index) => (
            <StoreItem key={index} catItem={catItem} onBuy={handleBuyItem} />
          ))}
        </Group>

        <Divider />

        <Flex mt={50} direction={"column"} className={classes.section}>
          <Text className={classes.sectionTitle}>Work Cats</Text>
          <Text className={classes.sectionText}>These cats are hard at work. Whenever the timer is on, they work alongside you!</Text>
        </Flex>

        <Group mb={50}>
          {WorkCats.map((catItem, index) => (
            <StoreItem key={index} catItem={catItem} onBuy={handleBuyItem} />
          ))}
        </Group>
      </Stack>
    </>
  );
}

export default StorePage