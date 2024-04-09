import { Center, Title, Text } from "@mantine/core";

export function Header() {
    return (
      <>
        <Center>
          <Title order={1} size={60} textWrap="balance">
            <Text
              inherit
              span
              fw={900}
              variant="gradient"
              gradient={{
                from: "rgba(255, 157, 71, 1)",
                to: "rgba(252, 210, 96, 1)",
                deg: 90,
              }}
            >
              Here's what you've been up to...
            </Text>
          </Title>
        </Center>
      </>
    );
  }