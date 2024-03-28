import { Card, rgba } from "@mantine/core";
import * as echarts from "echarts";

export function DistributionCard(props: any) {
  return (
    <>
      <Card
        shadow="xs"
        padding="md"
        bg={"rgba(241, 209, 121, 1)"}
        c={"black"}
        radius={"md"}
        mih={"25em"}
      >
        <h2>{props.title}</h2>
        <h3>{props.subtitle}</h3>
        <p>{props.description}</p>
      </Card>
    </>
  );
}
