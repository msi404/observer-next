/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { type FC } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/app/_components/ui/chart';

interface TwinChartProps {
  title: string;
  description: string;
  chartConfig: ChartConfig;
  chartData: { [key: string]: any }[]; // Ensuring it's an array of objects
  dataKey: string;
  nameKeyOne: string;
  nameKeyTwo: string;
  formatLabel?: boolean;
}

export const TwinChart: FC<TwinChartProps> = ({
  title,
  description,
  chartConfig,
  chartData,
  dataKey,
  nameKeyOne,
  nameKeyTwo,
  formatLabel = true,
}) => {
  const router = useRouter();

  // Click handler function
  const handleBarClick = (data: any, key: string) => {
    if (data && data[key]) {
      router.push(`/details/${data[key]}`); // Adjust the route as needed
    }
  };

  return (
    <Card className="shadow-none dark">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKey}
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) =>
                formatLabel ? value.slice(0, 3) : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey={nameKeyOne}
              fill={`var(--color-${nameKeyOne}`}
              radius={4}
              onClick={(e) => handleBarClick(e, dataKey)}
              style={{ cursor: 'pointer' }}
            />
            <Bar
              dataKey={nameKeyTwo}
              fill={`var(--color-${nameKeyTwo}`}
              radius={4}
              onClick={(e) => handleBarClick(e, dataKey)}
              style={{ cursor: 'pointer' }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          النتائج الكلية <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          يمثل العدد الكلي للبيانات
        </div>
      </CardFooter>
    </Card>
  );
};
