'use client';
import { useStatisticsQuery } from '@/app/_services/fetchApi';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  UsersRound,
  Eye,
  CircleAlert,
  UserRoundCheck,
  UserRoundSearch
} from 'lucide-react';

export const useStatistics = () =>
{
  const user = useSelector( selectUser );
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `ElectoralEntityId=${electoralEntityId}` : '';
  const { data, isLoading, isError, isSuccess, isFetching,refetch } = useStatisticsQuery(electoralEntityIdQuery);

  const statistics = [
    {
      permission: hasPermission(user, 'view:total-candidates'),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/candidates',
      total: data?.totalCandidates,
      icon: <div className='rounded-full bg-green-100 p-2'>
        <UsersRound size={30} color='green' />
      </div>,
      description: 'اجمالي عدد المرشحين'
    },
    {
      permission: hasPermission(user, 'view:total-observers'),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/observers',
      total: data?.totalObservers,
      icon:<div className='rounded-full bg-blue-100 p-2'>
        <Eye color='blue' size={30} />
      </div>,
      description: 'اجمالي عدد الوكلاء'
    },
    {
    	permission: hasPermission( user, 'view:total-complaints' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/issues',
      total: data?.totalComplaints,
      icon: <div className='rounded-full bg-red-100 p-2'>
        <CircleAlert size={30} color='red' />
      </div>,
      description: 'اجمالي عدد الشكاوى'
    },
    {
    	permission: hasPermission( user, 'view:total-comfirmed-voters' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/election-base',
      total: data?.totalConfirmedVoters,
      icon: <div className='rounded-full bg-green-100 p-2'>
        <UserRoundCheck size={30} color='green' />
      </div>,
      description: 'اجمالي عدد الناخبين المؤكدين'
    },
    {
    	permission: hasPermission( user, 'view:total-possible-voters' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/election-base',
      total: data?.totalPendingVoters,
      icon: <div className='rounded-full bg-blue-100 p-2'>
        <UserRoundSearch size={30} color='blue' />
      </div>,
      description: 'اجمالي عدد الناخبين المحتملين'
    },
  ];

  const electionResultsStatistics = [
    {
      permission: hasPermission(user, 'view:total-candidates'),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/candidates',
      total: data?.totalCandidates,
      icon: <UsersRound />,
      description: 'المرشحين'
    },
    {
      permission: hasPermission(user, 'view:total-observers'),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/observers',
      total: data?.totalObservers,
      icon: <Eye />,
      description: 'اجمالي عدد المراقبين'
    },
    {
    	permission: hasPermission( user, 'view:total-complaints' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/issues',
      total: data?.totalComplaints,
      icon: <CircleAlert />,
      description: 'اجمالي عدد المرشحين'
    },
    {
    	permission: hasPermission( user, 'view:total-comfirmed-voters' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/election-base',
      total: data?.totalConfirmedVoters,
      icon: <UserRoundCheck />,
      description: 'اجمالي عدد الناخبين المؤكدين'
    },
    {
    	permission: hasPermission( user, 'view:total-possible-voters' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      url: '/election-base',
      total: data?.totalPendingVoters,
      icon: <UserRoundSearch />,
      description: 'اجمالي عدد الناخبين المحتملين'
    },
  ];

  return {
    refetch,
    statistics,
    electionResultsStatistics
  };
};
