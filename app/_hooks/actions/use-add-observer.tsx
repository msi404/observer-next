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
  useElectoralEntitiesQuery,
  useGovCentersQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addUserSchema } from '@/app/_validation/user';

export const useAddObserver = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();

  const { refetch } = useUsersQuery(
    `Role=104&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [govCenterSearch, setGovCenterSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [pollingCenterSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { data: pollingCenters, isLoading: isLoadingPollingCenters, refetch: refetchPollingCenters } =
    usePollingCentersQuery('');

  const { data: electoralEntities, isLoading: isLoadingElectoralEntities, refetch: refetchElectoralEntities } =
    useElectoralEntitiesQuery('');

  const { data: govCenters, isLoading: isLoadingGovCenters, refetch: refetchGovCenters } =
    useGovCentersQuery('');

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      role: 104
    }
  });

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof addUserSchema>) => {
    try {
      form.setValue('role', 104);
      const result = await createUser(
        addUserSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data,
        variant: 'destructive'
      });
      console.log(error);
    } finally {
      refetch();
      setOpenAdd(false);
    }
  };
  // Effect to Update Search Options
  useEffect( () =>
  {
    refetchElectoralEntities()
    if (!isLoadingElectoralEntities) {
      setElectoralEntitiesSearch(
        electoralEntities?.data.items.map((electoralEntity: any) => ({
          value: electoralEntity.id,
          label: electoralEntity.name
        }))
      );
    }

    refetchPollingCenters()
    if (!isLoadingPollingCenters) {
      setPollingCentersSearch(
        pollingCenters?.data.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }

    refetchGovCenters()
    if (!isLoadingGovCenters) {
      setGovCenterSearch(
        govCenters?.data.items.map((govCenter: any) => ({
          value: govCenter.gov.id,
          label: govCenter.gov.name
        }))
      );
    }
  }, [
    electoralEntities,
    isLoadingElectoralEntities,
    pollingCenters,
    isLoadingPollingCenters,
    govCenters,
    isLoadingGovCenters,
    openAdd
  ]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    govCenterSearch,
    pollingCenterSearch,
    electoralEntitiesSearch
  };
};
