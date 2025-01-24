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

export const useStatistics = () => {
  const { data, isLoading, isError, isSuccess, isFetching,refetch } = useStatisticsQuery('');
  const user = useSelector(selectUser);

  const statistics = [
    {
      permission: hasPermission(user, 'view:total-candidates'),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      total: data?.data?.totalCandidates,
      icon: <UsersRound />,
      description: 'home:cards.totalOfCandidates'
    },
    {
      permission: hasPermission(user, 'view:total-observers'),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      total: data?.data?.totalObservers,
      icon: <Eye />,
      description: 'home:cards.totalOfObservers'
    },
    {
    	permission: hasPermission( user, 'view:total-complaints' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      total: data?.data?.totalComplaints,
      icon: <CircleAlert />,
      description: 'home:cards.totalOfComplaints'
    },
    {
    	permission: hasPermission( user, 'view:total-comfirmed-voters' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      total: data?.data?.totalConfirmedVoters,
      icon: <UserRoundCheck />,
      description: 'home:cards.totalOfConfirmedVoters'
    },
    {
    	permission: hasPermission( user, 'view:total-possible-voters' ),
      isLoading,
      isError,
      isSuccess,
      isFetching,
      total: data?.data?.totalPendingVoters,
      icon: <UserRoundSearch />,
      description: 'home:cards.totalOfPossibleVoters'
    },
  ];

  return {
    refetch,
    statistics
  };
};
