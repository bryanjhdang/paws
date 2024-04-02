import { useState, useEffect } from "react";

import { Card } from "@mantine/core";
import ReactECharts from "echarts-for-react";

export function DistributionCard(props: any): JSX.Element {
  /* ---------------------------------- State --------------------------------- */
  const [chartData, setChartData] = useState<any[]>([]);

  /* ---------------------------- Lifecycle Methods --------------------------- */
  useEffect(() => {
    mapData(props.timeEntries);
  }, [props.timeEntries]);

  /* ---------------------------- Helper functions ---------------------------- */
  function mapData(data: Map<string, number>) {
    let result: any[] = [];
    data.forEach((value, key) => {
      result.push({ value: value, name: key });
    });
    setChartData(result);
  }

  /* ------------------------------- Components ------------------------------- */

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
        tooltip: {
            show: false,
        },
        data: chartData,
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
        mih={"32em"}
        mah={"32em"}
      >
        <h2>{props.title}</h2>
        <ReactECharts option={chart} />
        <p>{props.description}</p>
      </Card>
    </>
  );
}
