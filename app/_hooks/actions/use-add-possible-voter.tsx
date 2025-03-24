/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {toast} from 'sonner'

import {
  useLazyPollingCentersQuery,
  useLazyUsersQuery,
  useVotersQuery
} from '@/app/_services/fetchApi';
import { useCreateVoterMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addPossibleVoterSchema } from '@/app/_validation/voter';

export const useAddPossibleVoter = () =>
{
    const user = useSelector(selectUser)
    const [pollingCentersCurrentPage, setPollingCentersCurrentPage] = useState(1);
    const [pollingCentersTotalPages, setPollingCentersTotalPages] = useState(1);
    const [candidatesCurrentPage, setCandidatesCurrentPage] = useState(1);
    const [candidatesCentersTotalPages, setCandidatesTotalPages] = useState(1);
    const pageSize = 10; // Fixed page size
  
    const globalPageSize = useSelector(selectPageSize);
    const globalCurrentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [ createVoter, { isLoading: isLoadingVoter } ] = useCreateVoterMutation();
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  const { refetch } = useVotersQuery(
    `State=0&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );

  // State Management
  const [usersSearch, setUsersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  // Lazy Query for Polling Centers
  const [
    fetchPollingCenters,
    {
      data: lazyPollingCenters,
      isFetching: isFetchingLazyPollingCenter,
    }
  ] = useLazyPollingCentersQuery();

  const [fetchUsers, {data: lazyUsers, isFetching: isFetchingLazyUsers}] = useLazyUsersQuery();

  // Form Setup
  const form = useForm<z.infer<typeof addPossibleVoterSchema>>({
    resolver: zodResolver(addPossibleVoterSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      address: '',
      state: 0,
      pollingCenterId: '',
      candidateId: '',
      serial: ''
    }
  } );
  
  // Fetch Initial
  useEffect(() => {
    fetchPollingCenters( `PageNumber=1&PageSize=${ pageSize }${ electoralEntityIdQuery }` );
    fetchUsers( `Role=102&PageNumber=1&PageSize=${pageSize}${electoralEntityIdQuery}`)
  }, [] );
  
    // Update When Data Changes
    useEffect(() => {
      if (lazyPollingCenters) {
        setPollingCentersSearch((prev) => [
          ...prev,
          ...lazyPollingCenters.items.map((pollingCenter: any) => ({
            value: pollingCenter.id,
            label: pollingCenter.name
          }))
        ]);
        setPollingCentersTotalPages(lazyPollingCenters.totalPages);
      }
    }, [ lazyPollingCenters ] );
  
  useEffect( () =>
  {
    if (lazyUsers) {
      setUsersSearch((prev) => [
        ...prev,
        ...lazyUsers.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      ]);
      setCandidatesTotalPages(lazyUsers.totalPages);
    }
  }, [lazyUsers])

  // Scroll Event Handler for Infinite Scroll
  const onPollingCenterScrollEnd = () => {
    if (pollingCentersCurrentPage < pollingCentersTotalPages && !isFetchingLazyPollingCenter) {
      setPollingCentersCurrentPage((prev) => prev + 1);
      fetchPollingCenters(`PageNumber=${pollingCentersCurrentPage + 1}&PageSize=${pageSize}${electoralEntityIdQuery}`);
    }
  };

  const onUserScrollEnd = () => {
    if (candidatesCurrentPage < candidatesCentersTotalPages && !isFetchingLazyUsers) {
      setCandidatesCurrentPage((prev) => prev + 1);
      fetchUsers(`PageNumber=${candidatesCurrentPage + 1}&PageSize=${pageSize}${electoralEntityIdQuery}`);
    }
  };

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      form.setValue('state', 0);
      const result = await createVoter(
        addPossibleVoterSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
      console.log(error);
    } finally {
      refetch();
      setOpenAdd(false);
    }
  };
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingVoter,
    pollingCentersSearch,
    usersSearch,
    onPollingCenterScrollEnd,
    onUserScrollEnd
  };
};
