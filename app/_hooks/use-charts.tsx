'use client';
import { useTranslation } from "react-i18next";
import { type ChartConfig } from "@/app/_components/ui/chart";

export const useCharts = () =>
{
	const { t } = useTranslation();

	const candidatesActivitiesChartConfig = {
		candidatesActivities: {
			label: t("home:charts.candidatesActivities.tooltips.label"),
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	const observersPerStateChartConfig = {
		numberOfObservers: {
			label: t("home:charts.ObserverByState.tooltips.label"),
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	const issuesChartConfig = {
		closed: {
			label: t("home:charts.issuesNumber.tooltips.closed"),
			color: "hsl(var(--chart-1))",
		},
		opened: {
			label: t("home:charts.issuesNumber.tooltips.opened"),
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return {
		candidatesActivitiesChartConfig,
		observersPerStateChartConfig,
		issuesChartConfig
	}
}