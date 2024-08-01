import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: 'Assets', value: 400, color: '#4149f5' },
  { name: 'Liabilities', value: 300, color: '#f44336' },
];

const chartConfig = {
  assets: {
    label: "Assets",
    color: "#4149f5",
  },
  liabilities: {
    label: "Liabilities",
    color: "#f44336",
  },
};

const SharedFinancialDashboard = () => {
  return (
    <div className='grid grid-cols-3'>
      <div className='col-span-2'>
        <Card>
          <CardHeader>
            <CardTitle>Shared Financial Dashboard</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='text-center'>
              <h2 className='text-xl font-bold'>Total Shared Assets</h2>
              <p className='text-3xl'>$400,000</p>
            </div>
            <div className='text-center'>
              <h2 className='text-xl font-bold'>Total Shared Liabilities</h2>
              <p className='text-3xl'>$300,000</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className='text-sm text-gray-600'>
              This section provides an overview of your total shared assets,
              liabilities, and net worth.
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className='text-center'>
        <Component />
      </div>
    </div>
  );
};

export function Component() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Assets vs Liabilities</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey="value" nameKey="name">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total shared financials for the current period
        </div>
      </CardFooter>
    </Card>
  );
}

export default SharedFinancialDashboard;
