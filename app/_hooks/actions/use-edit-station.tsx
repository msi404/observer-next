/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import
	{
	useUpdateStationMutation,
  useDeleteStationMutation
} from '@/app/_services/mutationApi';
import {useStationsQuery} from '@/app/_services/fetchApi'
import {toast} from 'sonner'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {addStationSchema} from '@/app/_validation/station'
export const useEditStation = ( { item }: { item: Station} ) =>
{
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateStation, { isLoading: isLoadingUpdate }] = useUpdateStationMutation();
  const [deleteStation, { isLoading: isLoadingDelete }] = useDeleteStationMutation();

  // State Management
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { refetch } = useStationsQuery(
	`PageNumber=${currentPage}&PageSize=${pageSize}&PollingCenterId=${item.pollingCenter.id}`
  );

   // Form Setup
	const form = useForm<z.infer<typeof addStationSchema>>({
		resolver: zodResolver(addStationSchema),
    defaultValues: {
      serial: item.serial,
		  pollingCenterId: item.pollingCenter.id
		}
	 });

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      await updateStation({
        station: addStationSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging
        toast.error( error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
    }
    finally
    {
      refetch();
		 setOpenUpdate( false );
		 form.reset()
    }
  };

  const onDelete = async () => {
    await deleteStation(item.id);
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
    isLoadingUpdate,
  };
};
