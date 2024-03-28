import { useState } from "react";
import { Flex, Group, Title } from "@mantine/core";
import { DatePickerInput, MonthPicker } from "@mantine/dates";
import "@mantine/dates/styles.css";

import { DistributionCard } from "./DistributionCard";

export function CardGroup({ timeEntries }: { timeEntries: any[] }) {
    /* ---------------------------------- State --------------------------------- */
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    /* ---------------------------- Helper Functions ---------------------------- */

    /* ------------------------------- Components ------------------------------- */

    function dateRangePicker() {
        return (
            <>
                <DatePickerInput
                    type="range"
                    label="View distribution for chosen date range:"
                    placeholder="Choose date range"
                    value={dateRange}
                    onChange={setDateRange}
                    maw={"20em"}
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
            subtitle={"Time spent on different projects"}
            description={
              "This card shows the distribution of time spent on different activities with a pie chart"
            }
            timeEntries={timeEntries}
          />

          <DistributionCard
            title={"Daily Average"}
            subtitle={"Time spent studying per day on average"}
            description={
              "This card shows the distribution of time a day on average with a pie chart"
            }
            timeEntries={timeEntries}
          />

          <DistributionCard
            title={"Distribution"}
            subtitle={"Time spent on different activities"}
            description={
              "This card shows the distribution of time spent on different activities."
            }
            timeEntries={timeEntries}
          />
        </Group>
      </Flex>
    </>
  );
}
