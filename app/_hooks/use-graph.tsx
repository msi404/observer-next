'use client';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import {
  useGenderStatisticsQuery,
  useComplaintsStatisticsQuery,
  useVotersStatisticsQuery,
  useCandidatesActivitiesStatisticsQuery,
  useVotersAgeStatisticsQuery
} from '@/app/_services/fetchApi';

export const useGraph = () => {
  const user = useSelector(selectUser);
  const queryVotersAge = hasPermission(user, 'view:voterAgeChart')
    ? ''
    : skipToken;
  const queryCandidates = hasPermission(user, 'view:candidatesChart')
    ? ''
    : skipToken;
  const queryVoters = hasPermission(user, 'view:votersByState') ? '' : skipToken;
  const queryGenders = hasPermission(user, 'view:gendersChart')
    ? ''
    : skipToken;
  const queryComplaints = hasPermission(user, 'view:total-issues-chart')
    ? ''
    : skipToken;

  const {
    data: voterByAge,
    isError: isErrorVoterByAge,
    isFetching: isFetchingVoterByAge,
    isLoading: isLoadingVoterByAge,
    isSuccess: isSuccessVoterByAge,
    refetch: refetchVoterByAge,
  } = useVotersAgeStatisticsQuery(queryVotersAge);

  const {
    data: candidatesActivites,
    isError: isErrorCandidates,
    isFetching: isFetchingCandidates,
    isLoading: isLoadingCandidates,
    isSuccess: isSuccessCandidates,
    refetch: refetchCandidates
  } = useCandidatesActivitiesStatisticsQuery(queryCandidates);

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
    refetchVoters,
    candidatesActivites,
    isErrorCandidates,
    isFetchingCandidates,
    isLoadingCandidates,
    isSuccessCandidates,
    refetchCandidates,
    isErrorVoterByAge,
    isFetchingVoterByAge,
    isLoadingVoterByAge,
    isSuccessVoterByAge,
    refetchVoterByAge,
    voterByAge
  };
};
