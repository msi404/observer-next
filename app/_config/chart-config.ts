import { type ChartConfig } from '@/app/_components/ui/chart';

export const votersByAgeChartConfig = {
	confirmedVoters: {
	  label: 'المؤكدين',
	  color: 'hsl(var(--chart-1))'
	},
	possibleVoters: {
	  label: 'المحتملين',
	  color: 'hsl(var(--chart-2))'
	}
 } satisfies ChartConfig;

 export const candidatesActivitiesChartConfig = {
	candidatesActivities: {
	  label: 'نشاط',
	  color: 'hsl(var(--chart-1))'
	}
 } satisfies ChartConfig;

 export const votersPerStateChartConfig = {
	confirmedVoters: {
	  label: 'المؤكدين',
	  color: 'hsl(var(--chart-1))'
	},
	possibleVoters: {
	  label: 'المحتملين',
	  color: 'hsl(var(--chart-2))'
	}
 } satisfies ChartConfig;

 export const issuesChartConfig = {
	closed: {
	  label: 'المغلقة',
	  color: 'hsl(var(--chart-1))'
	},
	opened: {
	  label: 'المفتوحة',
	  color: 'hsl(var(--chart-2))'
	}
 } satisfies ChartConfig;

 export const gendersChartConfig = {
	male: {
	  label: 'ذكر',
	  color: 'hsl(var(--chart-1))'
	},
	female: {
	  label: 'انثى',
	  color: 'hsl(var(--chart-2))'
	}
 } satisfies ChartConfig;