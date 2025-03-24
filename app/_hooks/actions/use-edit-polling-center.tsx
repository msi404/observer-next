/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdatePollingCenterMutation,
  useDeletePollingCenterMutation
} from '@/app/_services/mutationApi';
import { usePollingCentersQuery } from '@/app/_services/fetchApi';
import {toast} from 'sonner'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPollingCenterSchema } from '@/app/_validation/polling-center';

export const useEditPollingCenter = ({ item }: { item: PollingCenter }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const [updateGovCenter, { isLoading: isLoadingUpdate }] =
    useUpdatePollingCenterMutation();
  const [deleteGovCenter, { isLoading: isLoadingDelete }] =
    useDeletePollingCenterMutation();
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { refetch } = usePollingCentersQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}&GovCenterId=${item.govCenter.id}`
  );

  // Form Setup
  const form = useForm<z.infer<typeof addPollingCenterSchema>>({
    resolver: zodResolver(addPollingCenterSchema),
    defaultValues: {
      serial: item.serial,
      name: item.name,
      govCenterId: item.govCenter.gov.id,
      address: item.address,
      region: item.region,
      judiciary: item.judiciary
    }
  });

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      await updateGovCenter({
        pollingCenter: addPollingCenterSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
    } finally {
      refetch();
      setOpenUpdate(false);
      form.reset();
    }
  };

  const onDelete = async () => {
    await deleteGovCenter(item.id);
    refetch();
  };
  return {
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    form,
    onUpdate,
    onDelete,
    isLoadingDelete,
    isLoadingUpdate
  };
};
