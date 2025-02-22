'use client';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

export const useEditProvinceAdmins = ({ item }: { item: User }) => {
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

  const { refetch } = useUsersQuery(
    `Role=12&PageNumber=${globalCurrentPage}&PageSize=${globalPageSize}`
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
      pollingCenterId: item.pollingCenter?.id,
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
    fetchGovCenters(`PageNumber=1&PageSize=${pageSize}`);
  }, []);

  // Update When Data Changes
  useEffect(() => {
    if (lazyGovCenters) {
      setGovCentersSearch((prev) => {
        // Convert previous values to a Set for quick lookup
        const existingIds = new Set(prev.map((pc) => pc.value));

        // Add only new unique items from API response
        const updatedOptions = lazyGovCenters.items
          .map((pollingCenter: any) => ({
            value: pollingCenter.id,
            label: pollingCenter.name
          }))
          .filter((pc: any) => !existingIds.has(pc.value));

        // Ensure the selected polling center is included without duplication
        const selectedPollingCenter = item.pollingCenter
          ? { value: item.pollingCenter.id, label: item.pollingCenter.name }
          : null;

        return selectedPollingCenter &&
          !existingIds.has(selectedPollingCenter.value)
          ? [selectedPollingCenter, ...prev, ...updatedOptions]
          : [...prev, ...updatedOptions];
      });

      setGovCentersCurrentPage(lazyGovCenters.totalPages);
    }
  }, [lazyGovCenters]);

  // Scroll Event Handler for Infinite Scroll
  const onGovCenterScrollEnd = () => {
    if (
      govCentersCurrentPage < govCentersTotalPages &&
      !isFetchingLazyGovCenter
    ) {
      setGovCentersCurrentPage((prev) => prev + 1);
      fetchGovCenters(
        `PageNumber=${govCentersCurrentPage + 1}&PageSize=${pageSize}`
      );
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
