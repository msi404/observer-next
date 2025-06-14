/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import
	{
	useUpdateGovCenterMutation,
  useDeleteGovCenterMutation
} from '@/app/_services/mutationApi';
import {
  useGovCentersQuery,
  useProvincesQuery
} from '@/app/_services/fetchApi';
import {toast} from 'sonner'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addGovCenterSchema } from '@/app/_validation/gov-center'

export const useEditGovCenter = ( { item }: { item: GovCenter} ) =>
{
  const user = useSelector(selectUser)
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateGovCenter, { isLoading: isLoadingUpdate }] = useUpdateGovCenterMutation();
  const [deleteGovCenter, { isLoading: isLoadingDelete }] = useDeleteGovCenterMutation();


  // State Management
  const [govSearch, setGovSearch] = useState<
  { value: string; label: string }[]
>([]);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  // Query Data
  const { refetch } = useGovCentersQuery(
	`PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );
	
	 const { data: provinces, isLoading: isLoadingProvinces } =
		 useProvincesQuery('');
   // Form Setup
	const form = useForm<z.infer<typeof addGovCenterSchema>>({
		resolver: zodResolver(addGovCenterSchema),
    defaultValues: {
      serial: item.serial,
      name: item.name,
		  govId: item.gov.id
		}
	 });

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      await updateGovCenter({
        govCenter: addGovCenterSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
    }
    finally
    {
      refetch();
		 setOpenUpdate( false );
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
 }, [provinces, isLoadingProvinces, openUpdate]);

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
    isLoadingUpdate,
    govSearch
  };
};
