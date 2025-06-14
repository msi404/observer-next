'use client';
import { type FC } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

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
import { TrendingUp } from 'lucide-react';

interface StackChartProps {
  title: string;
  description: string;
  chartConfig: ChartConfig;
  chartData: unknown[];
  dataKey: string;
  nameKeyOne: string;
	nameKeyTwo: string;
	formatLabel?: boolean;
}
export const StackChart: FC<StackChartProps> = ({
  title,
  description,
	nameKeyOne,
  nameKeyTwo,
  dataKey,
  chartConfig,
  chartData,
  formatLabel = true,
}) => {
  return (
    <Card className='shadow-none dark'>
      <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey={dataKey}
              tickLine={true}
              tickMargin={10}
              axisLine={true}
				  tickFormatter={value =>
					formatLabel ? value.slice(0, 3) : value
				}
            />
            <Bar
              dataKey={nameKeyOne}
              stackId="a"
              fill={`var(--color-${nameKeyOne})`}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey={nameKeyTwo}
              stackId="a"
					fill={ `var(--color-${nameKeyTwo})` }
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
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
