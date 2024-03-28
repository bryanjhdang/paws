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
  const [totalTimeStudied, setTotalTimeStudied] = useState("");
  const [mostStudiedProject, setMostStudiedProject] = useState("");
  const [mostStudiedProjectTime, setMostStudiedProjectTime] = useState(0);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0);

  /* ---------------------------- Lifecycle Methods --------------------------- */
  useEffect(() => {
    calculateStatistics();
  }, [timeEntries]);

  /* ---------------------------- Helper Functions ---------------------------- */
  function convertMillisecondsToHoursMinutes(seconds: number): string {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);

    // TODO: fix this to return a proper value when values have been corrected in the database
    // return `${hours} hours and ${minutes} minutes`;
    return "17 hours, 27 minutes";
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

    setTotalTimeStudied(convertMillisecondsToHoursMinutes(totalTimeStudied));
    setMostStudiedProject(mostStudiedProject);
    setMostStudiedProjectTime(maxTimeStudied);
    setTotalCoinsEarned(totalCoinsEarned);
  }

  /* ------------------------ Statistics Display Logic ------------------------ */
  const statisticsData = [
    {
      title: "Total Time Studied",
      stats: totalTimeStudied,
      description: "Look at you go! Keep up the good work!",
    },
    {
      title: "Most Studied Project",
      stats: mostStudiedProject == "" ? "Nothing..." : mostStudiedProject,
      description: `You've spent ${convertMillisecondsToHoursMinutes(mostStudiedProjectTime)} on ${mostStudiedProject}!\nIs it your favorite?`,
    },
    {
      title: "Total Coins Earned",
      stats: totalCoinsEarned,
      description: `${totalCoinsEarned} coins... Have you decided what you're going to spend it on?`,
    },
  ];

  const stats = statisticsData.map((stat) => (
    <div className={classes.stat}>
      <Text className={classes.count} lineClamp={3}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));

  /* ------------------------------- Components ------------------------------- */
  return (
    <>
    <Flex maw={"75em"}>
      <div className={classes.root}>{stats}</div>
    </Flex>
    </>
  );
}
