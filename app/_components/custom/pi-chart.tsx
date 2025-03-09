/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { type FC } from 'react';
import { RefreshCcw, TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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
import {formatter} from '@/app/_utils/format-number'
interface PiChartProps {
  title: string;
  description: string;
  label: string;
  chartConfig: ChartConfig;
  chartData: { type: string; total: any; fill: string }[] | undefined;
  total: number | undefined;
  dataKey: string;
  nameKey: string;
  retry: VoidFunction;
}
export const PiChart: FC<PiChartProps> = ({
  title,
  description,
  label,
  chartConfig,
  chartData,
  total,
  dataKey,
  nameKey,
  retry
}) => {
  // Check if all values are zero
  const isDataZero =
    total === 0 || chartData?.every((item) => item.total === 0);

  return (
    <Card className="flex flex-col">
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
      <CardContent className="flex-1 pb-0 py-12">
        {isDataZero ? (
          // Show message if no data
          <h1 className="text-center text-xl font-bold text-gray-500">
            لا توجد بيانات
          </h1>
        ) : (
          // Show the chart if data exists
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
					content={ <ChartTooltipContent hideLabel /> }
              />
              <Pie
                data={chartData}
                dataKey={dataKey}
                nameKey={nameKey}
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                            className="fill-foreground text-3xl font-bold"
                          >
                            {formatter(total!)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {label}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          النتائج الكلية <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          يمثل العدد الكلي للبيانات
        </div>
      </CardFooter>
    </Card>
  );
};
