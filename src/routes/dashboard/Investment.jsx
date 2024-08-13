"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

const invoices = [
  {
    name: "Acct-1",
    Status: "Linked",
    totalAmount: "$250.00",
    type: "Brokerage",
  },
  {
    name: "Acct-2",
    Status: "Linked",
    totalAmount: "$150.00",
    type: "Retirement",
  },
  { name: "Acct-3", Status: "Linked", totalAmount: "$350.00", type: "Savings" },
];

const pieChartData = [
  { name: "Stocks", value: 275, fill: "#FF6384" },
  { name: "Bonds", value: 200, fill: "#36A2EB" },
  { name: "Real Estate", value: 287, fill: "#FFCE56" },
  { name: "Commodities", value: 173, fill: "#4BC0C0" },
  { name: "Cash", value: 190, fill: "#9966FF" },
];

const lineChartData = [
  { month: "January", Alice: 186, Bob: 305, Charlie: 80 },
  { month: "February", Alice: 305, Bob: 200, Charlie: 200 },
  { month: "March", Alice: 237, Bob: 120, Charlie: 120 },
  { month: "April", Alice: 73, Bob: 190, Charlie: 190 },
  { month: "May", Alice: 209, Bob: 130, Charlie: 130 },
  { month: "June", Alice: 214, Bob: 140, Charlie: 140 },
];

const chartConfig = {
  Alice: { label: "Alice", color: "#FF6384" },
  Bob: { label: "Bob", color: "#36A2EB" },
  Charlie: { label: "Charlie", color: "#FFCE56" },
};

const Investment = () => {
  const totalValue = useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <div className="container mx-auto my-5 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <header className="mb-4 md:mb-0">
          <h1 className="text-2xl font-medium dark:text-white animate-fadeIn">
            Investments
          </h1>
          <p className="text-muted-foreground dark:text-white/50 animate-fadeIn">
            Calculate your path to Financial Independence and Early Retirement.
          </p>
        </header>
        <Button className="mb-4 md:mb-0">Link Investment Accounts</Button>
      </div>

      <Table className="mb-8">
        <TableCaption>List of your Linked Investment Accounts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((account) => (
            <TableRow key={account.name}>
              <TableCell className="font-medium dark:text-gray-200">
                {account.name}
              </TableCell>
              <TableCell className="font-medium dark:text-gray-200">
                {account.Status}
              </TableCell>
              <TableCell className="font-medium dark:text-gray-200">
                {account.type}
              </TableCell>
              <TableCell className="text-right dark:text-gray-200">
                {account.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="dark:text-gray-200">
              Total
            </TableCell>
            <TableCell className="text-right dark:text-gray-200">
              $750
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex flex-col lg:flex-row gap-4 mb-4 mt-8">
        <Card className="flex-1 lg:flex-[0.5] pb-4">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>
              Detailed view of each asset's contribution
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto w-full h-[40vh] lg:h-[200px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  strokeWidth={3}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="text-3xl font-bold fill-black dark:fill-white"
                            >
                              {totalValue.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-black dark:fill-white"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-4">
              {pieChartData.map((entry, index) => (
                <div key={`item-${index}`} className="flex items-center gap-2">
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>
              Trends and changes in contributions over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[200px]">
              <LineChart data={lineChartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="Alice"
                  type="natural"
                  stroke={chartConfig.Alice.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.Alice.color }}
                  activeDot={{ r: 4 }}
                />
                <Line
                  dataKey="Bob"
                  type="natural"
                  stroke={chartConfig.Bob.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.Bob.color }}
                  activeDot={{ r: 4 }}
                />
                <Line
                  dataKey="Charlie"
                  type="natural"
                  stroke={chartConfig.Charlie.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.Charlie.color }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: chartConfig.Alice.color }}
                />
                <span className="text-sm">Alice</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: chartConfig.Bob.color }}
                />
                <span className="text-sm">Bob</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: chartConfig.Charlie.color }}
                />
                <span className="text-sm">Charlie</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total asset allocation for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-8 mt-8">
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
          <CardDescription>
            Ensure your data is accurate and complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="mt-2 grid gap-2 lg:grid-cols-2">
            <li className="flex items-center gap-2">
              <Badge className="p-2">1</Badge>
              <span className="leading-none">
                Complete your account information
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Badge className="p-2">2</Badge>
              <span className="leading-none">Add any missing transactions</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge className="p-2">3</Badge>
              <span className="leading-none">Verify your linked accounts</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge className="p-2">4</Badge>
              <span className="leading-none">
                Review and categorize expenses
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investment;
