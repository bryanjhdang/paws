import { useState, useEffect } from "react";
import { Text, Flex } from "@mantine/core";
import classes from "./styles/StatsGroup.module.css";

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
  function convertMillisecondsToHoursMinutes(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);

    // TODO: fix this to return a proper value when values have been corrected in the database
    return `${hours} hours and ${minutes} minutes`;
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
      //console.log(projectName, timeStudied);
    });

    //console.log(maxTimeStudied, mostStudiedProject);

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
