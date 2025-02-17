'use client';
import { type FC } from 'react';
import { useCurrentUserQuery } from '@/app/_services/fetchApi';
import {KpiItem} from '@/app/_components/kpi-item'
import { Card } from '@/app/_components/ui/card';
import { Background } from '@/app/_components/background';
import { Profile } from '@/app/_components/profile';
import { Spinner } from '@/app/_components/spinner';
import { Switch, Match } from '@/app/_components/switch';
import { Calendar, Users, Building2, Phone, Mail, Hash } from 'lucide-react';

export const CurrentProfileWidget: FC = () => {
  const { data, isLoading, isSuccess } = useCurrentUserQuery('');

  return (
    <Switch>
      <Match when={isSuccess}>
        <Card className="p-6 flex flex-col gap-24 overflow-hidden">
          <div className="relative mb-12">
            <Background className="rounded-md" />
            <div className="absolute -bottom-16 right-14 flex justify-center items-center gap-4">
              <Profile image={data?.data?.profileImg} className="border-4 border-white" />
              <div className="flex flex-col">
                <h1>{data.data.name}</h1>
                <p className="text-xs text-gray-600 mt-1">مرشح بغداد - الكرادة</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row gap-5'>
            <div className='space-y-4 bg-secondary p-3 rounded-md'>
            <div className='flex gap-4'>
              <Building2 />
              <h1>الكرادة</h1>
            </div>
            <div className='flex gap-4'>
              <Phone />
                <h1>{data?.data?.phone}</h1>
            </div>
            <div className='flex gap-4'>
              <Mail />
              <h1>{data?.data?.email}</h1>
            </div>
            <div className='flex gap-4'>
              <Hash />
                <h1>{data?.data?.candidateSerial}</h1>
            </div>
            </div>
          <div className='flex lg:flex-row flex-col justify-evenly gap-4'>
            <KpiItem Icon={<Calendar />} kpi={data?.data?.totalPosts} title='عدد المشاركات والفعاليات'/>
            <KpiItem Icon={<Users />} kpi={data?.data?.totalVoters} title='عدد الناخبين المحتملين'/>
            <KpiItem Icon={<Users />} kpi={data?.data?.totalVoters} title='عدد الناخبين المؤكدين'/>
            <KpiItem Icon={<Users />} kpi={data?.data?.candidateSerial} title='مرتبة المرشح في القائمة'/>
          </div>
          </div>
        </Card>
      </Match>
      <Match when={isLoading}>
        <Spinner />
      </Match>
    </Switch>
  );
};
