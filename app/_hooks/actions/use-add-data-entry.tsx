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
  useUsersQuery,
  useGovCentersQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addDataEntrySchema } from '@/app/_validation/user';

export const useAddDataEntry = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();

  const { refetch } = useUsersQuery(
    `Role=100&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  const [govCentersSearch, setGovCentersSearch] = useState<
  { value: string; label: string }[]
  >( [] );
  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
  
    // Query Data
    const { data: govCenters, isLoading: isLoadingGovCenters, refetch: refetchGovCenters } =
      useGovCentersQuery( '' );

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addDataEntrySchema>>({
    resolver: zodResolver(addDataEntrySchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govCenterId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      role: 100
    }
  });

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof addDataEntrySchema>) => {
    try {
      form.setValue('role', 100);
      const result = await createUser(
        addDataEntrySchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data?.msg || 'An unexpected error occurred',
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
      refetchGovCenters();
      if (!isLoadingGovCenters) {
        setGovCentersSearch(
          govCenters?.items.map((govCenter: any) => ({
            value: govCenter.id,
            label: govCenter.name
          }))
        );
      }
    }, [
      govCenters,
      isLoadingGovCenters,
      openAdd
    ] );
  
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    govCentersSearch
  };
};
