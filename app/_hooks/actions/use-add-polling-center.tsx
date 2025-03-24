/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {selectUser} from '@/app/_lib/features/authSlice'
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {toast} from 'sonner'
// API Services
import { useCreatePollingCenterMutation } from '@/app/_services/mutationApi';
import {
  usePollingCentersQuery
} from '@/app/_services/fetchApi';

// Validation Schemas
import { addPollingCenterSchema } from '@/app/_validation/polling-center';

export const useAddPollingCenter = ( govCenterId: string ) =>
{
  const user = useSelector(selectUser)
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector( selectCurrentPage );
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  // API Mutations & Queries
  const [createPollingCenter, { isLoading: isLoadingPollingCenter }] =
    useCreatePollingCenterMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchPollingCenters } = usePollingCentersQuery(
    `PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}&GovCenterId=${govCenterId}`
  );
  // Form Setup
  const form = useForm<z.infer<typeof addPollingCenterSchema>>({
    resolver: zodResolver(addPollingCenterSchema),
    defaultValues: {
      name: '',
      govCenterId: '',
      serial: '',
      address: '',
      region: '',
      judiciary: ''
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
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
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
