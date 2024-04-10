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
                from: "rgba(0, 0, 0, 0.8)",
                to: "rgba(0, 0, 0, 0.9)",
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