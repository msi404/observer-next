"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	useStatisticsQuery,
	useSuperAdminStatisticsQuery,
} from "@/app/_services/fetchApi";
import { hasPermission } from "@/app/_auth/auth-rbac";
import { selectUser } from "@/app/_lib/features/auth/authSlice";

export const useStats = () => {
	const initialStats = {
		candidateCount: 0,
		observerCount: 0,
		voterPotential: 0,
		voterConfirmed: 0,
		electionEntityCount: 0,
		pollingCenterCount: 0,
		stationCount: 0,
	};

	const user = useSelector(selectUser);
	const [stats, setStats] = useState(initialStats);
	const [isLoading, setIsLoading] = useState(true);
	const { data: statistics, isLoading: isStatsLoading } =
		useStatisticsQuery("");
	const { data: adminStatistics, isLoading: isAdminStatsLoading } =
		useSuperAdminStatisticsQuery("");

	useEffect(() => {
		if (!isStatsLoading && hasPermission(user, "fetch:GetStatistics")) {
			setStats(prev => ({
				...prev,
				...statistics.result,
			}));
			setIsLoading(false);
		}
		if (
			!isAdminStatsLoading &&
			hasPermission(user, "fetch:SupperAdminStatistic")
		) {
			setStats(prev => ({
				...prev,
				...adminStatistics.result,
			}));
			setIsLoading(false);
		}
	}, [
		adminStatistics,
		isAdminStatsLoading,
		isStatsLoading,
		statistics,
		user,
	]);

	return {
		isLoading,
		stats,
	};
};
