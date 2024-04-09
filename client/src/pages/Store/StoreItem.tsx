import { Button, Image, Stack, Text } from "@mantine/core";
import classes from "./StoreItem.module.css";
import { IconCoin } from '@tabler/icons-react';
import { CatItem } from "../../classes/models";

interface StoreItemProps {
  catItem: CatItem;
  onBuy: (id: number, cost: number) => void;
}

function StoreItem({ catItem, onBuy }: StoreItemProps) {
  const handlePurchaseItem = () => {
    console.log("test!")
    // TODO
  }

  return (
    <Stack className={classes.itemBackground} align="center" gap={10}>
      <Image className={classes.itemImage} src={catItem.path} />
      <Text className={classes.itemHeaderText}>{catItem.name}</Text>
      <Button 
        className={classes.itemPurchaseButton} 
        onClick={() => onBuy(catItem.id, catItem.cost)}
        color="#6ca74a"
      >
        <IconCoin stroke={1.5} />
        <Text className={classes.itemPriceText}>{catItem.cost}</Text>
      </Button>
    </Stack>
  )
}

export default StoreItem;