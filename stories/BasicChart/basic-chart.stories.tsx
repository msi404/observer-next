"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { type ChartConfig } from '@/app/_components/ui/chart';
import { BasicChart } from "@/stories/BasicChart/basic-chart";

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
 
const dataKey = 'month'
const nameKey = 'desktop'

const chartData = [
	{ [dataKey]: "January", [nameKey]: 186 },
	{ [dataKey]: "February", [nameKey]: 305 },
	{ [dataKey]: "March", [nameKey]: 237 },
	{ [dataKey]: "April", [nameKey]: 73 },
	{ [dataKey]: "May", [nameKey]: 209 },
	{ [dataKey]: "June", [nameKey]: 214 },
 ]

const chartConfig = {
	desktop: {
	  label: capitalizeFirstLetter(nameKey),
	  color: "hsl(var(--chart-1))",
	},
 } satisfies ChartConfig

const meta: Meta<typeof BasicChart> = {
  title: "Components/BasicChart",
  component: BasicChart,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    formatLabel: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof BasicChart>;

export const Default: Story = {
  args: {
    title: "إحصائيات المبيعات",
    description: "تمثيل بياني لمبيعات الأشهر الأخيرة",
    chartConfig,
    chartData,
    dataKey: dataKey,
    nameKey: nameKey,
    formatLabel: false,
    retry: () => alert("إعادة تحميل البيانات!"),
  },
};
