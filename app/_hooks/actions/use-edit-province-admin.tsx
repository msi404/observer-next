'use client';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import {
  useLazyGovCentersQuery,
  useIsUsernameTakenQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProvinceAdminSchema } from '@/app/_validation/user';
import { baseURL } from '@/app/_services/api';

export const useEditProvinceAdmins = ( { item }: { item: User; } ) =>
{
    const user = useSelector(selectUser)
  
  const [govCentersCurrentPage, setGovCentersCurrentPage] = useState(1);
  const [govCentersTotalPages, setGovCentersTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector(selectCurrentPage);

  const [username, setUsername] = useState('');
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  const { refetch } = useUsersQuery(
    `Role=12&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );
  const {
    data: isUsernameTaken,
    isSuccess: isUsernameTakenSuccess,
    refetch: refetchIsUsernameTaken
  } = useIsUsernameTakenQuery(username);

  // State Management
  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [
    fetchGovCenters,
    { data: lazyGovCenters, isFetching: isFetchingLazyGovCenter }
  ] = useLazyGovCentersQuery();

  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addProvinceAdminSchema>>({
    resolver: zodResolver(addProvinceAdminSchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      govCenterId: item.govCenter?.id,
      electoralEntityId: item.electoralEntity?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      profileImg: item?.profileImg,
      phone: item?.phone,
      email: item?.email,
      role: 102
    }
  });

  // Fetch Initial
  useEffect(() => {
    fetchGovCenters(`PageNumber=${govCentersCurrentPage}&PageSize=${pageSize}`);
  }, []);

  useEffect(() => {
    if (lazyGovCenters) {
      setGovCentersSearch((prev) => {
        // Convert previous values to a Map for quick lookup
        const existingItemsMap = new Map(prev.map((pc) => [pc.value, pc]));
  
        // Add new unique items from API response
        lazyGovCenters.items.forEach((govCenter: any) => {
          if (!existingItemsMap.has(govCenter.id)) {
            existingItemsMap.set(govCenter.id, {
              value: govCenter.id,
              label: govCenter.name
            });
          }
        });
  
        // Ensure the selected gov center is included without duplication
        if (item.govCenter && !existingItemsMap.has(item.govCenter.id)) {
          existingItemsMap.set(item.govCenter.id, {
            value: item.govCenter.id,
            label: item.govCenter.name
          });
        }
  
        return Array.from(existingItemsMap.values());
      });
  
      setGovCentersTotalPages(lazyGovCenters.totalPages);
    }
  }, [lazyGovCenters, item.govCenter]);
  // Scroll Event Handler for Infinite Scroll
  const onGovCenterScrollEnd = () => {
    if (govCentersCurrentPage < govCentersTotalPages && !isFetchingLazyGovCenter) {
      setGovCentersCurrentPage((prev) => prev + 1);
      fetchGovCenters(`PageNumber=${ govCentersCurrentPage + 1}&PageSize=${ pageSize }`);
    }
  };

  const onCheckUsernameTaken = () => {
    setUsername(form.getValues('username'));
    refetchIsUsernameTaken();
  };

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      if (fileRef.current) {
        const formData = new FormData();
        formData.append('file', fileRef.current as File);

        const response = await uploadFile(formData).unwrap();
        form.setValue('profileImg', `${baseURL}/${response?.data}`);
      } else {
        form.setValue('profileImg', item.profileImg);
      }
      form.setValue('role', 102);
      await updateUser({
        user: addProvinceAdminSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging

      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', '),
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: error.data?.msg || 'An unexpected error occurred',
          variant: 'destructive'
        });
      }
    } finally {
      refetch();
      setOpenUpdate(false);
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
    govCentersSearch,
    onGovCenterScrollEnd,
    isUsernameTakenSuccess,
    isUsernameTaken,
    onCheckUsernameTaken,
    isLoadingFile,
    fileRef
  };
};
