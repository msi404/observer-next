'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { useDataCards } from '@/app/_hooks/use-data-cards';
import { useChartsConfig } from '@/app/_hooks/use-charts-config';

import { DataCard } from '@/app/_components/data-card';
import { CardSkeleton } from '@/app/_components/card-skeleton';
import { Container } from '@/app/_components/container';
import { PiChart } from '@/app/_components/pi-chart';
import { BasicChart } from '@/app/_components/basic-chart';
import { Show } from '@/app/_components/show';
import { For } from '@/app/_components/for';
import {
  issuesChartData,
  candidatesActivitiesData,
  observersPerStateData,
} from '@/app/_utils/faker';

const Home = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const { dataCards } = useDataCards();

  const {
    candidatesActivitiesChartConfig,
    observersPerStateChartConfig,
    issuesChartConfig,
  } = useChartsConfig();

  const totalIssues = useMemo(() => {
    return issuesChartData.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  return (
    <Container className="space-y-6">
      {/* Data Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <For each={dataCards}>
          {(item, index) => (
            <Show
              key={ index }
              fallback={<CardSkeleton />}
              when={ !item.isLoading }>
            <Show
              when={item.permission}
            >
              <DataCard
                icon={item.icon}
                description={t(item.description)}
                total={item.total}
              />
            </Show>
           </Show>
          )}
        </For>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Show when={hasPermission(user, 'view:candidate-activity-chart')}>
          <BasicChart
            chartData={candidatesActivitiesData}
            chartConfig={candidatesActivitiesChartConfig}
            dataKey="month"
            nameKey="candidatesActivities"
            title={t('home:charts.candidatesActivities.title')}
            description={t('home:charts.candidatesActivities.description')}
          />
        </Show>

        <Show when={hasPermission(user, 'view:total-issues-chart')}>
          <PiChart
            total={totalIssues}
            chartConfig={issuesChartConfig}
            chartData={issuesChartData}
            dataKey="total"
            nameKey="type"
            title={t('home:charts.issuesNumber.title')}
            description={t('home:charts.issuesNumber.description')}
            label={t('home:charts.issuesNumber.label')}
          />
        </Show>
      </section>

      {/* Observers by State Chart */}
      <section>
        <Show when={hasPermission(user, 'view:observer-by-state-chart')}>
          <BasicChart
            chartData={observersPerStateData}
            chartConfig={observersPerStateChartConfig}
            formatLabel={false}
            dataKey="governorate"
            nameKey="numberOfObservers"
            title={t('home:charts.ObserverByState.title')}
            description={t('home:charts.ObserverByState.description')}
          />
        </Show>
      </section>
    </Container>
  );
};

export default Home;
