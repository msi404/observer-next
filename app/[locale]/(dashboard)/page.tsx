"use client";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/_lib/features/auth/authSlice";
import { hasPermission } from "@/app/_auth/auth-rbac";
import {useStats} from '@/app/_hooks/use-stats'
import {
	UsersRound,
	Eye,
	Codesandbox,
	Vote,
	Building2,
	Pencil,
	UserRoundCheck,
	UserRoundSearch,
} from "lucide-react";

import { type ChartConfig } from "@/app/_components/ui/chart";
import { DataCard } from "@/app/_components/data-card";
import { Container } from "@/app/_components/container";
import { PiChart } from "@/app/_components/pi-chart";
import { BasicChart } from "@/app/_components/basic-chart";

import {
	issuesChartData,
	candidatesActivitiesData,
	observersPerStateData,
} from "@/app/_utils/faker";

const Home = () =>
{
	const {stats, isLoading} = useStats()
	const user = useSelector(selectUser);
	const { t } = useTranslation();

	const totalIssues = useMemo(() => {
		return issuesChartData.reduce((acc, curr) => acc + curr.total, 0);
	}, []);

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

	return (
		<Container className="space-y-6">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{hasPermission(user, "view:total-candidates") && (
					<DataCard
						isLoading={isLoading}
						total={stats.candidateCount}
						description={t("home:cards.totalOfCandidates")}
						icon={<UsersRound />}
					/>
				)}

				{hasPermission(user, "view:total-observers") && (
					<DataCard
						isLoading={isLoading}
						total={stats.observerCount}
						description={t("home:cards.totalOfObservers")}
						icon={<Eye />}
					/>
				)}

				{hasPermission(user, "view:total-entities") && (
					<DataCard
						isLoading={isLoading}
						total={stats.electionEntityCount}
						description={t("home:cards.totalOfEntities")}
						icon={<Codesandbox />}
					/>
				)}

				{hasPermission(user, "view:total-polling-centers") && (
					<DataCard
						isLoading={isLoading}
						total={stats.pollingCenterCount}
						description={t("home:cards.totalOfPollingCenters")}
						icon={<Vote />}
					/>
				)}

				{hasPermission(user, "view:total-centers") && (
					<DataCard
						isLoading={isLoading}
						total={stats.stationCount}
						description={t("home:cards.totalOfStations")}
						icon={<Building2 />}
					/>
				)}

				{hasPermission(user, "view:total-data-entries") && (
					<DataCard
						isLoading={isLoading}
						total={stats.stationCount}
						description={t("home:cards.totalOfDataEntries")}
						icon={<Pencil />}
					/>
				)}

				{hasPermission(user, "view:total-comfirmed-voters") && (
					<DataCard
						isLoading={isLoading}
						total={stats.voterConfirmed}
						description={t("home:cards.totalOfConfirmedVoters")}
						icon={<UserRoundCheck />}
					/>
				)}

				{hasPermission(user, "view:total-possible-voters") && (
					<DataCard
						isLoading={isLoading}
						total={stats.voterPotential}
						description={t("home:cards.totalOfPossibleVoters")}
						icon={<UserRoundSearch />}
					/>
				)}
			</section>
			<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{hasPermission(user, "view:candidate-activity-chart") && (
					<BasicChart
						chartData={candidatesActivitiesData}
						chartConfig={candidatesActivitiesChartConfig}
						dataKey="month"
						nameKey="candidatesActivities"
						title={t("home:charts.candidatesActivities.title")}
						description={t(
							"home:charts.candidatesActivities.description"
						)}
					/>
				)}

				{hasPermission(user, "view:total-issues-chart") && (
					<PiChart
						total={totalIssues}
						chartConfig={issuesChartConfig}
						chartData={issuesChartData}
						dataKey="total"
						nameKey="type"
						title={t("home:charts.issuesNumber.title")}
						description={t("home:charts.issuesNumber.description")}
						lable={t("home:charts.issuesNumber.label")}
					/>
				)}
			</section>
			<section>
				{hasPermission(user, "view:observer-by-state-chart") && (
					<BasicChart
						chartData={observersPerStateData}
						chartConfig={observersPerStateChartConfig}
						formatLabel={false}
						dataKey="governorate"
						nameKey="numberOfObservers"
						title={t("home:charts.ObserverByState.title")}
						description={t(
							"home:charts.ObserverByState.description"
						)}
					/>
				)}
			</section>
		</Container>
	);
};

export default Home;
