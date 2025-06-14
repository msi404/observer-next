/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
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
import {toast} from 'sonner'
// API Services
import { useCreateStationMutation } from '@/app/_services/mutationApi';
import {
  useStationsQuery
} from '@/app/_services/fetchApi';

// Validation Schemas
import {addStationSchema} from '@/app/_validation/station'
export const useAddStation = (pollingCenterId: string) => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createStation, { isLoading: isLoadingStation }] =
    useCreateStationMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchStations } = useStationsQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}&PollingCenterId=${pollingCenterId}`
  );
  // Form Setup
  const form = useForm<z.infer<typeof addStationSchema>>({
    resolver: zodResolver(addStationSchema),
    defaultValues: {
      pollingCenterId: '',
      serial: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try
    {
      form.setValue('pollingCenterId', pollingCenterId)
      const result = await createStation(
        addStationSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
      console.log(error);
    } finally {
      refetchStations();
      setOpenAdd( false );
      form.reset()
    }
  };
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingStation
  };
};
