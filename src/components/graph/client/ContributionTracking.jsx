import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

const ContributionTracking = ({ partners, monthlyContributions }) => {
  const individualData =
    partners?.map((partner) => ({
      name: partner.name,
      value: partner.contribution,
      color: partner.color,
    })) || [];

  const chartConfig = {
    individualData,
  };

  const CustomLegend = ({ payload }) => (
    <ul className='flex-wrap gap-2 flex justify-center'>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className='flex items-center gap-2'>
          <span
            className='block w-2 h-2 rounded-sm'
            style={{ backgroundColor: entry.color }}
          ></span>
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );

  const newChartConfig = {
    partners: partners.reduce((acc, partner) => {
      acc[partner.name] = {
        label: partner.name,
        color: partner.color,
      };
      return acc;
    }, {}),
  };

  return (
    <div className='contribution-tracking my-4 gap-3 items-center grid grid-cols-1 lg:grid-cols-3'>
      <Card className='flex flex-col'>
        <CardHeader className='items-center pb-0'>
          <CardTitle className='text-lg' >
            Individual Contribution Breakdown
          </CardTitle>
          <CardDescription className='text-[12px]'>
            Detailed view of each partner's contribution
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          {individualData.length > 0 ? (
            <ChartContainer
              config={chartConfig}
              className='mx-auto aspect-square max-h-[250px]'
            >
              <ResponsiveContainer width='100%' height={250}>
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={individualData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                  >
                    {individualData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div>No data available</div>
          )}
        </CardContent>
        <CardFooter className='flex-col gap-2 text-[11px] text-center'>
          <div className='leading-none text-muted-foreground'>
            Visual representation of each partner's contribution.
          </div>
        </CardFooter>
      </Card>

      <div className='w-full col-span-2 mt-4 lg:mt-0'>
        <Card className='flex flex-col pb-5'>
          <CardHeader className='items-center pb-2'>
          <CardTitle className='text-lg' >
              Monthly Contribution History
            </CardTitle>
            <CardDescription className='text-[12px]'>
              Trends and changes in contributions over time
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1 pb-0 '>
            {monthlyContributions?.length > 0 ? (
              <ChartContainer config={newChartConfig} className="w-full h-[250px]">
                <ResponsiveContainer width='100%' height={250}>
                  <LineChart
                    accessibilityLayer
                    data={monthlyContributions}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} stroke='rgba(255, 255, 255, 0.1)' />
                    <XAxis
                      dataKey='month'
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      
                    />
                    <YAxis stroke='rgba(255, 255, 255, 0.1)' />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    {partners.map((partner, index) => (
                      <Line
                        key={index}
                        dataKey={partner.name}
                        type='monotone'
                        stroke={partner.color}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    ))}
                    <Legend content={<CustomLegend />} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div>No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContributionTracking;
