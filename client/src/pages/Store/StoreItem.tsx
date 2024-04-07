import { Text } from "@mantine/core"

interface StoreItemProps {
  name: string,
  price: string,
  unlocked: boolean
  // Add image later
}

function StoreItem({ name, price, unlocked } : StoreItemProps) {
  return (
    <>
      <Text>{name}</Text>
      <Text>{price}</Text>
      <Text>{unlocked}</Text>
    </>
  )
}

export default StoreItem;