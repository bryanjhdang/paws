import { useState, useEffect } from "react";

import { Text, } from "@mantine/core";
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
    darkMode: true,
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#F3F0E6",
      },
    },
    series: [
      {
        top: 20,
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
        <Text c={"#F3F0E6"} size="lg" fw={700}>{props.title}</Text>
        <ReactECharts option={chart} />
        <Text c={"#F3F0E6"} size="lg">{props.description}</Text>
    </>
  );
}
