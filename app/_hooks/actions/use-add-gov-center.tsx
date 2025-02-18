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

// API Services
import { useCreateGovCenterMutation } from '@/app/_services/mutationApi';
import {
  useGovCentersQuery,
  useProvincesQuery
} from '@/app/_services/fetchApi';

// Validation Schemas
import { addGovCenterSchema } from '@/app/_validation/gov-center';

export const useAddGovCenter = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createGovCenter, { isLoading: isLoadingGovCenter }] =
    useCreateGovCenterMutation();

  // State Management
  const [govSearch, setGovSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchGovCenters } = useGovCentersQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  const { data: provinces, isLoading: isLoadingProvinces } =
    useProvincesQuery('');

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addGovCenterSchema>>({
    resolver: zodResolver(addGovCenterSchema),
    defaultValues: {
      serial: '',
      name: '',
      govId: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      const result = await createGovCenter(
        addGovCenterSchema.parse(form.getValues())
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
      refetchGovCenters();
      setOpenAdd( false );
      form.reset()
    }
  };

  // Effect to Update Search Options
  useEffect(() => {
    if (!isLoadingProvinces) {
      setGovSearch(
        provinces?.data.items.map((gov: any) => ({
          value: gov.id,
          label: gov.name
        }))
      );
    }
  }, [provinces, isLoadingProvinces, openAdd]);

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingGovCenter,
    govSearch
  };
};
