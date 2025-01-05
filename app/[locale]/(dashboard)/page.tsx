'use client'
import { useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {useDataEntryQuery} from '@/app/_services/fetchApi'

import
{
  UsersRound,
  Eye,
  Codesandbox,
  Vote,
  Building2,
  Pencil,
  UserRoundCheck,
  UserRoundSearch,
} from 'lucide-react'

import { type ChartConfig} from '@/app/_components/ui/chart'

import { DataCard } from '@/app/_components/data-card'
import { Container } from '@/app/_components/container'
import { PiChart } from '@/app/_components/pi-chart'
import {BasicChart} from '@/app/_components/basic-chart'

import
  {
    issuesChartData,
    candidatesActivitiesData,
    observersPerStateData
  } from '@/app/utils/faker'


const Home = () =>
{ 
  const {data, error, isLoading} = useDataEntryQuery('')
  const { t } = useTranslation()
  
  const totalIssues = useMemo(() => {
    return issuesChartData.reduce((acc, curr) => acc + curr.total, 0)
  }, [] )

  const candidatesActivitiesChartConfig = {
    candidatesActivities: {
      label: t('home:charts.candidatesActivities.tooltips.label'),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  
  const observersPerStateChartConfig = {
    numberOfObservers: {
      label: t('home:charts.ObserverByState.tooltips.label'),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const issuesChartConfig = {
    closed: {
      label: t('home:charts.issuesNumber.tooltips.closed'),
      color: "hsl(var(--chart-1))",
    },
    opened: {
      label: t('home:charts.issuesNumber.tooltips.opened'),
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  useEffect( () =>
  {
    if ( !isLoading && !error )
    {
      console.log(data);
    }
  }, [data, error, isLoading])
  
  return (
    <Container className='space-y-6'>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <DataCard total={17} description={t('home:cards.totalOfCandidates')} icon={<UsersRound />} />
        <DataCard total={44} description={t('home:cards.totalOfObservers')} icon={<Eye />} />
        <DataCard total={3} description={t('home:cards.totalOfEntities')} icon={<Codesandbox />} />
        <DataCard total={0} description={t('home:cards.totalOfPollingCenters')} icon={<Vote />} />
        <DataCard total={0} description={t('home:cards.totalOfStations')} icon={<Building2 />} />
        <DataCard total={0} description={t('home:cards.totalOfDataEntries')} icon={<Pencil />} />
        <DataCard total={0} description={t('home:cards.totalOfConfirmedVoters')} icon={<UserRoundCheck />} />
        <DataCard total={0} description={t('home:cards.totalOfPossibleVoters')} icon={<UserRoundSearch />} />
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        <BasicChart
          chartData={ candidatesActivitiesData }
          chartConfig={ candidatesActivitiesChartConfig }
          dataKey='month'
          nameKey='candidatesActivities'
          title={t('home:charts.candidatesActivities.title')}
          description={t('home:charts.candidatesActivities.description')} />

        <PiChart
          total={ totalIssues }
          chartConfig={ issuesChartConfig }
          chartData={ issuesChartData }
          dataKey='total'
          nameKey='type'
          title={t('home:charts.issuesNumber.title')}
          description={t('home:charts.issuesNumber.description')}
          lable={t('home:charts.issuesNumber.label')} />
      </section>
      <section>
        <BasicChart
          chartData={ observersPerStateData }
          chartConfig={ observersPerStateChartConfig }
          formatLabel={false}
          dataKey='governorate'
          nameKey='numberOfObservers'
          title={t('home:charts.ObserverByState.title')}
          description={t('home:charts.ObserverByState.description')} />

      </section>
    </Container>
  )
};

export default Home;