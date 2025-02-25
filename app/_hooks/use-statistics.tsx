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
      icon: <UsersRound />,
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
