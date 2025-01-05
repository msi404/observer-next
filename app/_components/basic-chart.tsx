"use client";
import { type FC } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/app/_components/ui/chart";

interface BasicChartProps {
	title: string;
	description: string;
	chartConfig: ChartConfig;
	chartData: unknown[];
	dataKey: string;
	nameKey: string;
	formatLabel?: boolean;
}

export const BasicChart: FC<BasicChartProps> = ({
	title,
	description,
	chartConfig,
	chartData,
	dataKey,
	nameKey,
	formatLabel = true,
} ) =>
{
	return (
		<Card>
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
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={value =>
								formatLabel ? value.slice(0, 3) : value
							}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar
							dataKey={nameKey}
							fill={`var(--color-${nameKey}`}
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
};
