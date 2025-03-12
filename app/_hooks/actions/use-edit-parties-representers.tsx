/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  useLazyElectoralEntitiesQuery,
  useIsUsernameTakenQuery
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
  electoralEntity: { id: string; name: string };
  govId: string;
  phone: string;
  password: string;
  username: string;
  email: string;
}

export const useEditPartiesRepresenters = ({
  item
}: {
  item: PartiesRepresentersItem;
}) => {
  const [electoralEntitiesCurrentPage, setElectoralEntitiesCurrentPage] =
    useState(1);
  const [electoralEntitiessTotalPages, setElectoralEntitiesTotalPages] =
    useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector(selectCurrentPage);
  const [username, setUsername] = useState('');

  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { refetch } = useUsersQuery(
    `Role=10&PageNumber=${globalCurrentPage}&PageSize=${globalPageSize}`
  );
  const {
    data: isUsernameTaken,
    isSuccess: isUsernameTakenSuccess,
    refetch: refetchIsUsernameTaken
  } = useIsUsernameTakenQuery(username);

  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

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
      gender: String(item.gender), // ✅ Convert to string
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      electoralEntityId: item.electoralEntity?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 10
    }
  });

  // Fetch Initial
  useEffect(() => {
    fetchElectoralEntities('');
  }, []);

  useEffect(() => {
    if (lazyElectoralEntities) {
      setElectoralEntitiesSearch((prev) => {
        // Convert previous values to a Map for quick lookup
        const existingItemsMap = new Map(prev.map((pc) => [pc.value, pc]));

        // Add new unique items from API response
        lazyElectoralEntities.items.forEach((electoralEntity: any) => {
          if (!existingItemsMap.has(electoralEntity.id)) {
            existingItemsMap.set(electoralEntity.id, {
              value: electoralEntity.id,
              label: electoralEntity.name
            });
          }
        });

        // Ensure the selected electoral entity is included without duplication
        if (
          item.electoralEntity &&
          !existingItemsMap.has(item.electoralEntity.id)
        ) {
          existingItemsMap.set(item.electoralEntity.id, {
            value: item.electoralEntity.id,
            label: item.electoralEntity.name
          });
        }

        return Array.from(existingItemsMap.values());
      });

      setElectoralEntitiesTotalPages(lazyElectoralEntities.totalPages);
    }
  }, [lazyElectoralEntities, item.electoralEntity]);

  // Scroll Event Handler for Infinite Scroll
  const onElectoralEntitiesScrollEnd = () => {
    if (
      electoralEntitiesCurrentPage < electoralEntitiessTotalPages &&
      !isFetchingLazyElectoralEntities
    ) {
      setElectoralEntitiesCurrentPage((prev) => prev + 1);
      fetchElectoralEntities(
        `PageNumber=${electoralEntitiesCurrentPage + 1}&PageSize=${pageSize}`
      );
    }
  };

  const onCheckUsernameTaken = () => {
    setUsername(form.getValues('username'));
    refetchIsUsernameTaken();
  };

  const onDelete = async () => {
    await deleteUser(item.id);
    refetch();
  };

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
    } finally {
      refetch();
      setOpenUpdate(false);
    }
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
    onElectoralEntitiesScrollEnd,
    isUsernameTakenSuccess,
    isUsernameTaken,
    onCheckUsernameTaken
  };
};
