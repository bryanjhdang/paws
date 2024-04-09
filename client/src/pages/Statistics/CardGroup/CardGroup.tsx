import { useState, useEffect } from "react";
import { Flex, Group, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

import { DistributionCard } from "./DistributionCard";

export function CardGroup({ timeEntries }: { timeEntries: any[] }) {
  /* ---------------------------------- State --------------------------------- */
  // by default the date range will be set to the 1st to the last day of the current month
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    firstDay,
    lastDay,
  ]);

  const [dateFilteredTimeEntries, setDateFilteredTimeEntries] = useState<any[]>(
    []
  );

  const [projectDistributions, setProjectDistributions] = useState<
    Map<string, number>
  >(new Map());
  const [timerAverage, setTimerAverage] = useState<Map<string, number>>(
    new Map()
  );

  /* ---------------------------- Lifecycle Methods --------------------------- */
  // since the timeEntries are retrieved from the database, each time the timeEntries change, update the project distributions
  // because it might take some time for timeEntries to have proper data in it
  useEffect(() => {
    if (dateRange[0] && dateRange[1] && dateRange[0] <= dateRange[1]) {
      console.log("timeEntries has loaded / changed. Filtering data...");
      filterUpdated();
    } else {
      console.log("dateRange is not valid. Not filtering data.");
    }
  }, [timeEntries, dateRange]);

  /* ---------------------------- Helper Functions ---------------------------- */
  function filterProjectDistributions(entries: any): void {
    // take the filtered time entries and calculate the time spent on each project
    // store the values in a hashmap in a key-value pair
    // the key is the project name and the value is the time spent on that project
    let projects: Map<string, number> = new Map();
    entries.forEach((entry: any) => {
      let projectName = entry.name;
      let timeStudied = entry.endTime - entry.startTime;

      if (projects.has(projectName)) {
        projects.set(
          projectName,
          (projects.get(projectName) ?? 0) + timeStudied
        );
      } else {
        projects.set(projectName, timeStudied);
      }
    });

    // since a pie chart is limited, only show the top 3 projects
    // the rest of the projects will be grouped into an "Other" category

    // first sort the projects by time spent
    let sortedProjects = new Map(
      [...projects.entries()].sort((a, b) => b[1] - a[1])
    );

    let topProjects = new Map([...sortedProjects.entries()].slice(0, 3));

    setProjectDistributions(topProjects);
  }

  function filtertimerAverage(entries: any): void {
    let totalTimeStudied: number = 0;
    entries.forEach((entry: any) => {
      let timeStudied = entry.endTime - entry.startTime;
      totalTimeStudied += timeStudied;
    });
    let averageTimeStudied = totalTimeStudied / entries.length;

    let timerAverage: Map<string, number> = new Map();
    timerAverage.set("Studying", averageTimeStudied);
    timerAverage.set("Not studying", 24 * 60 * 60 - averageTimeStudied);

    setTimerAverage(timerAverage);
  }

  function filterUpdated(): void {
    let filteredTimeEntries: any = [];

    timeEntries.forEach((entry) => {
      let entryDate = new Date(entry.startTime);
      if (
        dateRange[0] &&
        dateRange[1] &&
        entryDate >= dateRange[0] &&
        entryDate <= dateRange[1]
      ) {
        filteredTimeEntries.push(entry);
      }
    });
    console.log("after filtering: ", dateFilteredTimeEntries.length);

    filterProjectDistributions(filteredTimeEntries);
    filtertimerAverage(filteredTimeEntries);
  }

  /* ----------------------------- Event handlers ----------------------------- */
  function onDateRangeChange(range: [Date | null, Date | null]): void {
    setDateRange(range);
  }

  /* ------------------------------- Components ------------------------------- */

  function dateRangePicker(): JSX.Element {
    return (
      <>
        <DatePickerInput
          type="range"
          label="View distribution for chosen date range:"
          placeholder="Choose date range"
          value={dateRange}
          onChange={onDateRangeChange}
          firstDayOfWeek={0}
          maxDate={new Date()}
          maw={"18em"}
        />
      </>
    );
  }

  return (
    <>
      <Flex maw={"75em"} direction={"column"}>
        <Title order={1}>Distributions</Title>

        {dateRangePicker()}

        <Group justify="center" grow pt={10}>
          <DistributionCard
            title={"Project Distribution"}
            description={"This chart shows you your top 3 projects."}
            timeEntries={projectDistributions}
          />

          <DistributionCard
            title={"Timer Average"}
            description={"This chart shows you how much you study in a day."}
            timeEntries={timerAverage}
          />
        </Group>
      </Flex>
    </>
  );
}
