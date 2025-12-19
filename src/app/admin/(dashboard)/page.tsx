import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";

import data from "../data.json";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <div>
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}
