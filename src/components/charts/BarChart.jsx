import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { month: 'Jan', budget: 500, spent: 450 },
          { month: 'Feb', budget: 600, spent: 500 },
          { month: 'Mar', budget: 700, spent: 650 },
        ]}
        keys={['budget', 'spent']}
        indexBy="month"
        margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        colors={['#2563eb', '#b72aee']}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Amount',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'top-right',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: -30,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemTextColor: '#000000',
            symbolSize: 20,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        role="application"
      />
    </div>
  );
}

export default BarChart;
