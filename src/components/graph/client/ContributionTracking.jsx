import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const ContributionTracking = ({ partners, monthlyContributions }) => {
  const individualData = partners?.map((partner) => ({
    name: partner.name,
    value: partner.contribution,
    color: partner.color,
  })) || [];

  const chartConfig = {
    individualData,
  };

  return (
    <div className="contribution-tracking p-4 mb-4 flex justify-between items-center">
      <div className=''>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart</CardTitle>
            <CardDescription>Individual Contribution Breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {individualData.length > 0 ? (
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={individualData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {individualData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div>No data available</div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Individual contributions detailed in the pie chart above.
            </div>
            <div className="leading-none text-muted-foreground">
              Visual representation of each partner's contribution.
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className='w-full'>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>Monthly Contribution History</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {monthlyContributions?.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={monthlyContributions}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {partners.map((partner, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={partner.name}
                      stroke={partner.color}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div>No data available</div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Historical contributions over the months.
            </div>
            <div className="leading-none text-muted-foreground">
              Trends and changes in contributions over time.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ContributionTracking;
