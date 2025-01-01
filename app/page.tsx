import {useMemo} from 'react'

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

import {issuesChartData} from '@/app/utils/faker'

const chartData = [...issuesChartData]
const chartConfig = {
  closed: {
    label: "مغلقة",
    color: "hsl(var(--chart-1))",
  },
  opened: {
    label: "جديدة",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const Home = () =>
{ 
  const totalIssues = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0)
  }, [] )
  
  return (
    <Container className='space-y-6'>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <DataCard total={17} description='اجمالي عدد المرشحين' icon={<UsersRound />} />
        <DataCard total={44} description='اجمالي عدد المراقبين' icon={<Eye />} />
        <DataCard total={3} description='اجمالي عدد الكيانات' icon={<Codesandbox />} />
        <DataCard total={0} description='اجمالي عدد مراكز الاقتراع' icon={<Vote />} />
        <DataCard total={0} description='اجمالي عدد المحطات' icon={<Building2 />} />
        <DataCard total={0} description='اجمالي عدد مدخلين البيانات' icon={<Pencil />} />
        <DataCard total={0} description='اجمالي عدد الناخبين المؤكدين' icon={<UserRoundCheck />} />
        <DataCard total={0} description='اجمالي عدد الناخبين المحتملين' icon={<UserRoundSearch />} />
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <BasicChart />
        <PiChart
          total={ totalIssues }
          chartConfig={ chartConfig }
          chartData={ chartData }
          dataKey='total'
          nameKey='type'
          title='عدد الشكاوى'
          description='عدد الشكاوى التي تم الرد عليها والتي لم يتم الرد عليه'
          lable='شكوى' />
      </section>
    </Container>
  )
};

export default Home;