'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Hooks
import { useToast } from '@/app/_hooks/use-toast';

import {
  usePollingCentersQuery,
  useUsersQuery,
  useVotersQuery
} from '@/app/_services/fetchApi';
import { useCreateVoterMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addPossibleVoterSchema } from '@/app/_validation/voter';

export const useAddPossibleVoter = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createVoter, { isLoading: isLoadingVoter }] = useCreateVoterMutation();
  const { refetch } = useVotersQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
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
  const {
    data: pollingCenters,
    isLoading: isLoadingPollingCenters,
    refetch: refetchPollingCenters
  } = usePollingCentersQuery('');
  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers
  } = useUsersQuery('Role=102');

  // Toast Hook
  const { toast } = useToast();

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
  });

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof addPossibleVoterSchema>) => {
    try {
      form.setValue('state', 0);
      const result = await createVoter(
        addPossibleVoterSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data.title,
        variant: 'destructive'
      });
      console.log(error);
    } finally {
      refetch();
      setOpenAdd(false);
    }
  };
  // Effect to Update Search Options
  useEffect(() => {
    refetchPollingCenters();
    if (!isLoadingUsers) {
      setUsersSearch(
        users?.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      );
    }
    refetchUsers();
    if (!isLoadingPollingCenters) {
      setPollingCentersSearch(
        pollingCenters?.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }
  }, [users, isLoadingUsers, pollingCenters, isLoadingPollingCenters, openAdd]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingVoter,
    pollingCentersSearch,
    usersSearch
  };
};
