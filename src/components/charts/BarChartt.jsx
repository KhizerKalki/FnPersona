import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { ResponsiveChartContainer } from "@mui/x-charts";

const BarChartt = () => {
  return (
    // <ResponsiveChartContainer width="100%" height="100%">
    <BarChart
      xAxis={[{ scaleType: "band", data: ["Previous Month", "Current Month"] }]}
      series={[{ data: [ 30000, 50000] }, { data: [ 60000, 30000] }]}
      width={500}
      height={300}
    />
    // </ResponsiveChartContainer>
  );
};

export default BarChartt;
