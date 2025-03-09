'use client';
import { type FC } from 'react';
import { RefreshCcw, TrendingUp } from 'lucide-react';
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
import { motion } from 'motion/react';

interface TwinChartProps {
  title: string;
  description: string;
  chartConfig: ChartConfig;
  chartData: unknown[];
  dataKey: string;
  nameKeyOne: string;
  nameKeyTwo: string;
  formatLabel?: boolean;
  retry: VoidFunction;
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
  retry
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <motion.button
            onClick={retry}
            whileHover={{
              scale: 1.1,
              transition: {
                damping: 0,
                ease: 'linear',
                duration: 0.2
              }
            }}
            className="bg-slate-200 p-4 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <RefreshCcw size="25px" />
          </motion.button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
            />
            <Bar
              dataKey={nameKeyTwo}
              fill={`var(--color-${nameKeyTwo}`}
              radius={4}
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
