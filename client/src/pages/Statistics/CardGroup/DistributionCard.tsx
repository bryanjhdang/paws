import { Card } from "@mantine/core";

import ReactECharts from "echarts-for-react";

export function DistributionCard(props: any) {
  const chart = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  return (
    <>
      <Card
        shadow="xs"
        padding="md"
        bg={"rgba(241, 209, 121, 1)"}
        c={"black"}
        radius={"md"}
      >
        <h2>{props.title}</h2>
        <ReactECharts option={chart} />
        <p>{props.description}</p>
      </Card>
    </>
  );
}
