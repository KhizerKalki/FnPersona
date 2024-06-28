import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { ResponsiveChartContainer } from '@mui/x-charts';

const PieChartt = ()=> {
  return (
    // <ResponsiveChartContainer width="100%" height="100">
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Asset 1' },
            { id: 2, value: 20, label: 'Asset 2' },
            { id: 1, value: 15, label: 'Liability 1' },
            
          ],
        },
      ]}
      width={400}
      height={200}
    />
    // </ResponsiveChartContainer>
  );
}

export default PieChartt;
