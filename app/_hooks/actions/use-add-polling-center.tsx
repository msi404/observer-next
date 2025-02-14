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
import { useToast } from '@/app/_hooks/use-toast';

// API Services
import { useCreatePollingCenterMutation } from '@/app/_services/mutationApi';
import {
  usePollingCentersQuery
} from '@/app/_services/fetchApi';

// Validation Schemas
import { addPollingCenterSchema } from '@/app/_validation/polling-center';

export const useAddPollingCenter = (govCenterId: string) => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createPollingCenter, { isLoading: isLoadingPollingCenter }] =
    useCreatePollingCenterMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchPollingCenters } = usePollingCentersQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}&GovCenterId=${govCenterId}`
  );
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addPollingCenterSchema>>({
    resolver: zodResolver(addPollingCenterSchema),
    defaultValues: {
      name: '',
      govCenterId: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try
    {
      form.setValue('govCenterId', govCenterId)
      const result = await createPollingCenter(
        addPollingCenterSchema.parse(form.getValues())
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
      refetchPollingCenters();
      setOpenAdd( false );
      form.reset()
    }
  };
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingPollingCenter
  };
};
