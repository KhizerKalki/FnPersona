import * as React from "react";
import {
  FaEyeSlash,
  FaMoneyBill,
  FaToolbox,
  FaTrafficLight,
} from "react-icons/fa";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/components/theme/theme-provider";

const revenueData = [
  { name: "Page A", revenue: 4000, subscription: 2400 },
  { name: "Page B", revenue: 3000, subscription: 1398 },
  { name: "Page C", revenue: 2000, subscription: 9800 },
  { name: "Page D", revenue: 2780, subscription: 3908 },
  { name: "Page E", revenue: 1890, subscription: 4800 },
  { name: "Page F", revenue: 2390, subscription: 3800 },
  { name: "Page G", revenue: 3490, subscription: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "black",
          borderRadius: "8px",
          border: "1px solid lightgray",
          padding: "8px",
          color: "white",
          fontSize: "12px",
        }}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function NetWorthCard() {
  const { theme } = useTheme();

  return (
    <Card className="dark:bg-black" style={{ height: "100%" }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Total Net Worth</CardTitle>
        <CardTitle className="text-3xl font-medium text-emerald-400">
          <FaMoneyBill />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold flex flex-col h-full ">
          $15,231.89
        </div>
        <p className="text-[13px] font-medium text-muted-foreground dark:text-white/50">
          <span className="text-emerald-500 font-semibold">+20.1%</span> last
          month
        </p>
        <div className="h-[120px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="revenue"
                activeDot={{
                  r: 6,
                  style: {
                    fill: theme === "dark" ? "white" : "#1f77b4",
                    opacity: 0.25,
                  },
                }}
                stroke={theme === "dark" ? "white" : "#18191a"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end gap-2">
          <FaToolbox className="text-gray-500" />
          <FaEyeSlash className="text-gray-500" />
          <FaTrafficLight className="text-gray-500" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default NetWorthCard;
