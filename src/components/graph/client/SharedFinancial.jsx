import React, { useState, useMemo } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { date: '2024-04-01', assets: 222, liabilities: 150 },
  { date: '2024-04-02', assets: 97, liabilities: 180 },
  { date: '2024-04-03', assets: 167, liabilities: 120 },
  { date: '2024-04-04', assets: 242, liabilities: 260 },
  { date: '2024-04-05', assets: 373, liabilities: 290 },
  { date: '2024-04-06', assets: 301, liabilities: 340 },
  { date: '2024-04-07', assets: 245, liabilities: 180 },
  { date: '2024-04-08', assets: 409, liabilities: 320 },
  { date: '2024-04-09', assets: 59, liabilities: 110 },
  { date: '2024-04-10', assets: 261, liabilities: 190 },
  { date: '2024-04-11', assets: 327, liabilities: 350 },
  { date: '2024-04-12', assets: 292, liabilities: 210 },
  { date: '2024-04-13', assets: 342, liabilities: 380 },
  { date: '2024-04-14', assets: 137, liabilities: 220 },
  { date: '2024-04-15', assets: 120, liabilities: 170 },
  { date: '2024-04-16', assets: 138, liabilities: 190 },
  { date: '2024-04-17', assets: 446, liabilities: 360 },
  { date: '2024-04-18', assets: 364, liabilities: 410 },
  { date: '2024-04-19', assets: 243, liabilities: 180 },
  { date: '2024-04-20', assets: 89, liabilities: 150 },
  { date: '2024-04-21', assets: 137, liabilities: 200 },
  { date: '2024-04-22', assets: 224, liabilities: 170 },
  { date: '2024-04-23', assets: 138, liabilities: 230 },
  { date: '2024-04-24', assets: 387, liabilities: 290 },
  { date: '2024-04-25', assets: 215, liabilities: 250 },
  { date: '2024-04-26', assets: 75, liabilities: 130 },
  { date: '2024-04-27', assets: 383, liabilities: 420 },
  { date: '2024-04-28', assets: 122, liabilities: 180 },
  { date: '2024-04-29', assets: 315, liabilities: 240 },
  { date: '2024-04-30', assets: 454, liabilities: 380 },
  { date: '2024-05-01', assets: 165, liabilities: 220 },
  { date: '2024-05-02', assets: 293, liabilities: 310 },
  { date: '2024-05-03', assets: 247, liabilities: 190 },
  { date: '2024-05-04', assets: 385, liabilities: 420 },
  { date: '2024-05-05', assets: 481, liabilities: 390 },
  { date: '2024-05-06', assets: 498, liabilities: 520 },
  { date: '2024-05-07', assets: 388, liabilities: 300 },
  { date: '2024-05-08', assets: 149, liabilities: 210 },
  { date: '2024-05-09', assets: 227, liabilities: 180 },
  { date: '2024-05-10', assets: 293, liabilities: 330 },
  { date: '2024-05-11', assets: 335, liabilities: 270 },
  { date: '2024-05-12', assets: 197, liabilities: 240 },
  { date: '2024-05-13', assets: 197, liabilities: 160 },
  { date: '2024-05-14', assets: 448, liabilities: 490 },
  { date: '2024-05-15', assets: 473, liabilities: 380 },
  { date: '2024-05-16', assets: 338, liabilities: 400 },
  { date: '2024-05-17', assets: 499, liabilities: 420 },
  { date: '2024-05-18', assets: 315, liabilities: 350 },
  { date: '2024-05-19', assets: 235, liabilities: 180 },
  { date: '2024-05-20', assets: 177, liabilities: 230 },
  { date: '2024-05-21', assets: 82, liabilities: 140 },
  { date: '2024-05-22', assets: 81, liabilities: 120 },
  { date: '2024-05-23', assets: 252, liabilities: 290 },
  { date: '2024-05-24', assets: 294, liabilities: 220 },
  { date: '2024-05-25', assets: 201, liabilities: 250 },
  { date: '2024-05-26', assets: 213, liabilities: 170 },
  { date: '2024-05-27', assets: 420, liabilities: 460 },
  { date: '2024-05-28', assets: 233, liabilities: 190 },
  { date: '2024-05-29', assets: 78, liabilities: 130 },
  { date: '2024-05-30', assets: 340, liabilities: 280 },
  { date: '2024-05-31', assets: 178, liabilities: 230 },
  { date: '2024-06-01', assets: 178, liabilities: 200 },
  { date: '2024-06-02', assets: 470, liabilities: 410 },
  { date: '2024-06-03', assets: 103, liabilities: 160 },
  { date: '2024-06-04', assets: 439, liabilities: 380 },
  { date: '2024-06-05', assets: 88, liabilities: 140 },
  { date: '2024-06-06', assets: 294, liabilities: 250 },
  { date: '2024-06-07', assets: 323, liabilities: 370 },
  { date: '2024-06-08', assets: 385, liabilities: 320 },
  { date: '2024-06-09', assets: 438, liabilities: 480 },
  { date: '2024-06-10', assets: 155, liabilities: 200 },
  { date: '2024-06-11', assets: 92, liabilities: 150 },
  { date: '2024-06-12', assets: 492, liabilities: 420 },
  { date: '2024-06-13', assets: 81, liabilities: 130 },
  { date: '2024-06-14', assets: 426, liabilities: 380 },
  { date: '2024-06-15', assets: 307, liabilities: 350 },
  { date: '2024-06-16', assets: 371, liabilities: 310 },
  { date: '2024-06-17', assets: 475, liabilities: 520 },
  { date: '2024-06-18', assets: 107, liabilities: 170 },
  { date: '2024-06-19', assets: 341, liabilities: 290 },
  { date: '2024-06-20', assets: 408, liabilities: 450 },
  { date: '2024-06-21', assets: 169, liabilities: 210 },
  { date: '2024-06-22', assets: 317, liabilities: 270 },
  { date: '2024-06-23', assets: 480, liabilities: 530 },
  { date: '2024-06-24', assets: 132, liabilities: 180 },
  { date: '2024-06-25', assets: 141, liabilities: 190 },
  { date: '2024-06-26', assets: 434, liabilities: 380 },
  { date: '2024-06-27', assets: 448, liabilities: 490 },
  { date: '2024-06-28', assets: 149, liabilities: 200 },
  { date: '2024-06-29', assets: 103, liabilities: 160 },
  { date: '2024-06-30', assets: 446, liabilities: 400 },
];

const chartConfig = {
  views: {
    label: 'Amount',
  },
  assets: {
    label: 'Total Shared Assets',
    color: 'hsl(var(--chart-1))',
  },
  liabilities: {
    label: 'Total Shared Liabilities',
    color: 'hsl(var(--chart-2))',
  },
};

export function SharedFinancial() {
  const [activeChart, setActiveChart] = useState('assets');

  const total = useMemo(
    () => ({
      assets: chartData.reduce((acc, curr) => acc + curr.assets, 0),
      liabilities: chartData.reduce((acc, curr) => acc + curr.liabilities, 0),
    }),
    []
  );

  return (
    <Card className=''>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b dark:border-gray-100/10 p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Shared Financial Dashboard</CardTitle>
          <CardDescription>
            Showing total financial data for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          {['assets', 'liabilities'].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='flex flex-1 flex-col justify-center gap-1 border-t dark:border-gray-100/10  px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground whitespace-nowrap'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[chart].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke='rgba(255, 255, 255, 0.1)' />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type='monotone'
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
