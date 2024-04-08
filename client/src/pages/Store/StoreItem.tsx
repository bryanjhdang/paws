import { Button, Flex, Group, Image, Stack, Text } from "@mantine/core";
import classes from "./StoreItem.module.css";
import ExampleImage from "../../assets/nowork-cats/sleepy-cat-1.gif"
import Example2 from "../../assets/work-cats/work-cat-3.gif"
import { IconCoin } from '@tabler/icons-react';

function StoreItem() {
  const handlePurchaseItem = () => {
    console.log("test!")
  }

  return (
    <Stack className={classes.itemBackground} align="center" gap={10}>
      <Image className={classes.itemImage} src={Example2} />
      <Text className={classes.itemHeaderText}>Snickers</Text>
      <Button 
        className={classes.itemPurchaseButton} 
        onClick={handlePurchaseItem}
        color="#6ca74a"
      >
        <IconCoin stroke={1.5} />
        <Text className={classes.itemPriceText}>100</Text>
      </Button>
    </Stack>
  )
}

export default StoreItem;