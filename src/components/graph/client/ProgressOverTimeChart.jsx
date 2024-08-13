import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid, 
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const progressData = [
  { date: 'Jan', progress: 1000 },
  { date: 'Feb', progress: 2000 },
  { date: 'Mar', progress: 3000 },
  { date: 'Apr', progress: 4000 },
  { date: 'May', progress: 4500 },
  { date: 'Jun', progress: 5000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '8px',
          border: '1px solid lightgray',
          padding: '8px',
          color: 'white',
          fontSize: '12px',
        }}
      >
        <p className='label'>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ProgressOverTimeChart = ({ data = progressData }) => {
  return (
    <Card>
      <CardHeader>
      <CardTitle className='text-lg' >Progress Over Time</CardTitle>
      <CardDescription className='text-[12px]'>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[200px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke='rgba(255, 255, 255, 0.1)' />
              <XAxis 
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Line
                type='monotone'
                strokeWidth={3}
                dataKey='progress'
                activeDot={{
                  r: 6,
                  style: { fill: '#1f77b4', opacity: 0.25 },
                }}
                stroke='#2643ad'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
      <div className='flex gap-2 font-medium leading-none'>
          Progress up by 40% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing progress over the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProgressOverTimeChart;
