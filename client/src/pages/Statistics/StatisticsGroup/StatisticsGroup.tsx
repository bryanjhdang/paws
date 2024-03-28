import { useState, useEffect } from "react";
import { Text, Flex } from "@mantine/core";
import classes from "./styles/StatsGroup.module.css";

const data = [
  {
    title: "Page views",
    stats: "456,133",
    description:
      "24% more than in the same month last year, 33% more that two years ago",
  },
  {
    title: "New users",
    stats: "2,175",
    description:
      "13% less compared to last month, new user engagement up by 6%",
  },
  {
    title: "Completed orders",
    stats: "1,994",
    description: "1994 orders were completed this month, 97% satisfaction rate",
  },
];

export function StatisticsGroup({ timeEntries }: { timeEntries: any[] }) {
  /* ---------------------------------- State --------------------------------- */
  const [totalTimeStudied, setTotalTimeStudied] = useState(0);
  const [mostStudiedProject, setMostStudiedProject] = useState("");
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0);

    /* ---------------------------- Lifecycle Methods --------------------------- */
    useEffect(() => {
        calculateStatistics();
    }, [timeEntries]);

  const statisticsData = [
    {
      title: "Total Time Studied",
      stats: totalTimeStudied,
      description: "Total time spent studying this month",
    },
    {
      title: "Most Studied Project",
      stats: mostStudiedProject == "" ? "Nothing..." : mostStudiedProject,
      description: "Project you spent the most time on this month",
    },
    {
      title: "Total Coins Earned",
      stats: totalCoinsEarned,
      description: "Total coins earned this month",
    },
  ];

  /* ---------------------------- Helper Functions ---------------------------- */
  function convertSecondsToHoursMinutes(seconds: number): string {

  }

  function calculateStatistics(): void {
    let totalCoinsEarned = 0;
    let totalTimeStudied = 0;
    let mostStudiedProject = "";
    let projectStudiedMap = new Map<string, number>();

    timeEntries.forEach((entry) => {
      let projectName = entry.name;
      let timeStudied = entry.endTime - entry.startTime;
      let coinsEarned = entry.earnedCoins;

      totalTimeStudied += timeStudied;
      totalCoinsEarned += coinsEarned;

      if (projectStudiedMap.has(projectName)) {
        projectStudiedMap.set(
          projectName,
          (projectStudiedMap.get(projectName) ?? 0) + timeStudied
        );
      } else {
        projectStudiedMap.set(projectName, timeStudied);
      }
    });

    let maxTimeStudied = 0;
    projectStudiedMap.forEach((timeStudied, projectName) => {
      if (timeStudied > maxTimeStudied) {
        maxTimeStudied = timeStudied;
        mostStudiedProject = projectName;
      }
    });

    setTotalTimeStudied(totalTimeStudied);
    setMostStudiedProject(mostStudiedProject);
    setTotalCoinsEarned(totalCoinsEarned);
  }

  const stats = statisticsData.map((stat) => (
    <div className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));

  /* ------------------------------- Components ------------------------------- */
  return (
    <>
      <div className={classes.root}>{stats}</div>
    </>
  );
}
