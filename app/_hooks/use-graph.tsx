'use client';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { useComplaintsStatisticsQuery } from '@/app/_services/fetchApi';
import { useGenderStatisticsQuery } from '@/app/_services/fetchApi';
import { useVotersStatisticsQuery } from '@/app/_services/fetchApi';

export const useGraph = () => {
  const user = useSelector(selectUser);
  const queryVoters = hasPermission(user, 'view:candidates') ? '' : skipToken;
  const queryGenders = hasPermission(user, 'view:total-issues-chart')
    ? ''
    : skipToken;
  const queryComplaints = hasPermission(user, 'view:total-issues-chart')
    ? ''
    : skipToken;

  const {
    data: voters,
    isError: isErrorVoters,
    isFetching: isFetchingVoters,
    isLoading: isLoadingVoters,
    isSuccess: isSuccessVoters,
    refetch: refetchVoters
  } = useVotersStatisticsQuery(queryVoters);

  const {
    data: genders,
    isError: isErrorGenders,
    isFetching: isFetchingGenders,
    isLoading: isLoadingGenders,
    isSuccess: isSuccessGenders,
    refetch: refetchGenders
  } = useGenderStatisticsQuery(queryGenders);

  const {
    data: complaints,
    isError: isErrorComplaints,
    isFetching: isFetchingComplaints,
    isLoading: isLoadingComplaints,
    isSuccess: isSuccessComplaints,
    refetch: refetchComplaints
  } = useComplaintsStatisticsQuery(queryComplaints);

  return {
    complaints,
    isErrorComplaints,
    isFetchingComplaints,
    isLoadingComplaints,
    isSuccessComplaints,
    refetchComplaints,
    genders,
    isErrorGenders,
    isFetchingGenders,
    isLoadingGenders,
    isSuccessGenders,
    refetchGenders,
    voters,
    isErrorVoters,
    isFetchingVoters,
    isLoadingVoters,
    isSuccessVoters,
    refetchVoters
  };
};
