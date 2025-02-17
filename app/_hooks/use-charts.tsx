'use client';
import { type ChartConfig } from '@/app/_components/ui/chart';

export const useCharts = () => {
  const votersByAgeChartConfig = {
    confirmedVoters: {
      label: 'المؤكدين',
      color: 'hsl(var(--chart-1))'
    },
    possibleVoters: {
      label: 'المحتملين',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  const candidatesActivitiesChartConfig = {
    candidatesActivities: {
      label: 'نشاط',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig;

  const votersPerStateChartConfig = {
    confirmedVoters: {
      label: 'المؤكدين',
      color: 'hsl(var(--chart-1))'
    },
    possibleVoters: {
      label: 'المحتملين',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  const issuesChartConfig = {
    closed: {
      label: 'المغلقة',
      color: 'hsl(var(--chart-1))'
    },
    opened: {
      label: 'المفتوحة',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  const gendersChartConfig = {
    male: {
      label: 'ذكر',
      color: 'hsl(var(--chart-1))'
    },
    female: {
      label: 'انثى',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  return {
    candidatesActivitiesChartConfig,
    votersPerStateChartConfig,
    issuesChartConfig,
    gendersChartConfig,
    votersByAgeChartConfig
  };
};
