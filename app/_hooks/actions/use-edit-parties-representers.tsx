'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateUserMutation,
  useDeleteUserMutation
} from '@/app/_services/mutationApi';
import {
  useUsersQuery,
  useLazyElectoralEntitiesQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addElectralAdminSchema } from '@/app/_validation/user';

interface PartiesRepresentersItem {
  id: string;
  name: string;
  dateOfBirth: string;
  pollingCenter: { id: string };
  electoralEntity: { id: string, name: string };
  govId: string;
  phone: string;
  password: string;
  username: string;
  email: string;
}

export const useEditPartiesRepresenters = ({ item }: { item: PartiesRepresentersItem }) => {
  const [electoralEntitiesCurrentPage, setElectoralEntitiesCurrentPage] =
  useState(1);
const [electoralEntitiessTotalPages, setElectoralEntitiesTotalPages] =
  useState(1);
const pageSize = 10; // Fixed page size

const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector( selectCurrentPage );
  
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { refetch } = useUsersQuery(
    `Role=10&PageNumber=${globalCurrentPage}&PageSize=${globalPageSize}`
  );  

  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
  { value: string; label: string }[]
    >( [] );
  
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [ openDelete, setOpenDelete ] = useState<boolean>( false );
  
  const [
    fetchElectoralEntities,
    { data: lazyElectoralEntities, isFetching: isFetchingLazyElectoralEntities }
  ] = useLazyElectoralEntitiesQuery();

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addElectralAdminSchema>>({
    resolver: zodResolver(addElectralAdminSchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      electoralEntityId: item.electoralEntity?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 10
    }
  } );
  
     // Fetch Initial
     useEffect(() => {
      fetchElectoralEntities(`PageNumber=${ electoralEntitiesCurrentPage }&PageSize=${ pageSize }`);
     }, [] );

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      form.setValue('role', 10);
      await updateUser({
        user: addElectralAdminSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging
        toast({
          title: 'Error',
          description: error.data?.msg || 'An unexpected error occurred',
          variant: 'destructive'
        });
    }
    finally
    {
      refetch();
      setOpenUpdate(false);
    }
  };
  // Update When Data Changes
  useEffect(() => {
    if (lazyElectoralEntities) {
      setElectoralEntitiesSearch((prev) => {
        // Convert previous values to a Set for quick lookup
        const existingIds = new Set(prev.map((pc) => pc.value));
  
        // Add only new unique items from API response
        const updatedOptions = lazyElectoralEntities.items
          .map((pollingCenter: any) => ({
            value: pollingCenter.id,
            label: pollingCenter.name
          }))
          .filter((pc: any) => !existingIds.has(pc.value));
  
        // Ensure the selected polling center is included without duplication
        const selectedElectoralEntites = item.electoralEntity
          ? { value: item.electoralEntity.id, label: item.electoralEntity.name }
          : null;
  
        return selectedElectoralEntites && !existingIds.has(selectedElectoralEntites.value)
          ? [selectedElectoralEntites, ...prev, ...updatedOptions]
          : [...prev, ...updatedOptions];
      });
  
      setElectoralEntitiesTotalPages(lazyElectoralEntities.totalPages);
    }
  }, [ lazyElectoralEntities ] );
  
  // Scroll Event Handler for Infinite Scroll
const onElectoralEntitiesScrollEnd = () => {
  if (electoralEntitiesCurrentPage < electoralEntitiessTotalPages && !isFetchingLazyElectoralEntities) {
    setElectoralEntitiesCurrentPage((prev) => prev + 1);
    fetchElectoralEntities(`PageNumber=${ electoralEntitiesCurrentPage + 1}&PageSize=${ pageSize }`);
  }
};

  const onDelete = async () => {
    await deleteUser(item.id);
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
    electoralEntitiesSearch,
    onElectoralEntitiesScrollEnd
  };
};
