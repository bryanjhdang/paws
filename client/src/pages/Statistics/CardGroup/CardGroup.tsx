import { useState, useEffect } from "react";
import { Flex, Group, Title, Card } from "@mantine/core";
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

  const [projectDistributions, setProjectDistributions] = useState<
    Map<string, number>
  >(new Map());

  const [dayMostStudied, setDayMostStudied] = useState<Map<string, number>>(
    new Map()
  );

  /* ---------------------------- Lifecycle Methods --------------------------- */
  // since the timeEntries are retrieved from the database, each time the timeEntries change, update the project distributions
  // because it might take some time for timeEntries to have proper data in it
  useEffect(() => {
    if (dateRange[0] && dateRange[1] && dateRange[0] <= dateRange[1]) {
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

  function filterDayMostStudied(entries: any): void {
    let days: Map<string, number> = new Map();

    entries.forEach((entry: any) => {
      let entryDate = new Date(entry.startTime);
      let day = entryDate.toLocaleDateString("en-US", { weekday: "long" });

      if (days.has(day)) {
        days.set(day, (days.get(day) ?? 0) + 1);
      } else {
        days.set(day, 1);
      }
    });

    let sortedDays = new Map([...days.entries()].sort((a, b) => b[1] - a[1]));

    setDayMostStudied(sortedDays);
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

    filterProjectDistributions(filteredTimeEntries);
    filterDayMostStudied(filteredTimeEntries);
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

        <Group justify="flex-start" grow pt={10}>
          <Card
            shadow="xs"
            padding="md"
            bg={"#5B3347"}
            c={"black"}
            radius={"md"}
            mih={"28em"}
            mah={"28em"}

          >
            <DistributionCard
              title={"Project Distribution"}
              description={"This chart shows you your top 3 projects."}
              timeEntries={projectDistributions}
            />
          </Card>

          <Card
            shadow="xs"
            padding="md"
            bg={"#5B3347"}
            c={"black"}
            radius={"md"}
            mih={"28em"}
            mah={"32em"}
          >
            <DistributionCard
              title={"Day Distrubution"}
              description={"This chart shows you what day you study the most."}
              timeEntries={dayMostStudied}
            />
          </Card>
        </Group>
      </Flex>
    </>
  );
}
