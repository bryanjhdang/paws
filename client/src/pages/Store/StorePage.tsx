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
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../../components/PageLoader";

function StorePage() {

  // const [storeItems, setStoreItems] = useState<>
  const [petData, setPetData] = useState<Pet>();
  const [coins, setCoins] = useState<number>(0);
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userId = user?.sub || "not logged in";

        // todo: handle these in the backend instead of sending as request?
        Promise.all([
          getPet(userId, token),
          getCoins(userId, token)
        ]).then((responses) => {
          setPetData(responses[0]); 
          setCoins(responses[1]);  
          setLoading(false);    
        });

        console.log(petData);

      } catch (error) {
        console.error(error);
      }
    };

    makeAuthenticatedRequest();
  }, [getAccessTokenSilently]);

  const handleBuyItem = (id: number, cost: number) => {
    // This should never be called
    
    if (petData?.ownedCats.includes(id)) {
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

    getAccessTokenSilently().then((token) => {
      buyPet(id, cost, token).then(() => {
        if (petData) {
          const updatedOwned = [...petData.ownedCats, id];
          setPetData(new Pet(petData.restId, petData.workId, updatedOwned));
          notifications.show({
            title: "Purchased",
            message: "Your new cat friend is excited to work with you.",
            color: "green",
            withBorder: true
          })
        }
        setCoins(prevCoins => prevCoins - cost);
      }).catch(error => {
        console.error("Purchase failed:", error);
        alert("Failed to purchase item.");
      });
    }).catch(error => {
      console.error(error);
    })
  }

  const handleEquipItem = (id: number, isRestCat: boolean) => {
    if (!petData) return;

    console.log(id);
    console.log(isRestCat);

    const updatedPet = new Pet(
      isRestCat ? id : petData.restId,
      !isRestCat ? id : petData.workId, 
      petData.ownedCats
    );

    console.log(updatedPet);
    
    getAccessTokenSilently().then((token) => {
      equipPet(updatedPet, token).then(() => {
        setPetData(updatedPet);
      })
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

  if (loading) return <PageLoader/>

  return (
    <>
      <FunctionalHeader text="Store" element={coinDisplay()} />
      <Stack p={40}>
        <Flex direction={"column"} className={classes.section}>
          <Text className={classes.sectionTitle}>Rest Cats</Text>
        </Flex>

        <Group mb={50}>
          {RestCats.map((catItem, index) => (
            <StoreItem
              key={index}
              catItem={catItem}
              onBuy={handleBuyItem}
              onEquip={handleEquipItem}
              isOwned={petData ? petData.ownedCats.includes(catItem.id) : false}
              isInUse={petData ? (petData.restId === catItem.id || petData.workId === catItem.id) : false}
            />
          ))}
        </Group>

        <Divider />

        <Flex mt={50} direction={"column"} className={classes.section}>
          <Text className={classes.sectionTitle}>Work Cats</Text>
        </Flex>

        <Group mb={50}>
          {WorkCats.map((catItem, index) => (
            <StoreItem
              key={index}
              catItem={catItem}
              onBuy={handleBuyItem}
              onEquip={handleEquipItem}
              isOwned={petData ? petData.ownedCats.includes(catItem.id) : false}
              isInUse={petData ? (petData.restId === catItem.id || petData.workId === catItem.id) : false}
            />
          ))}
        </Group>
      </Stack>
    </>
  );
}

export default StorePage