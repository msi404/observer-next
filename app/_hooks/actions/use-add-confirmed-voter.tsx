/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Hooks
import { toast } from 'sonner';
// API Services
import { baseURL } from '@/app/_lib/features/apiSlice';
import {
  useLazyPollingCentersQuery,
  useLazyUsersQuery,
  useVotersQuery
} from '@/app/_services/fetchApi';
import {
  useUploadFileMutation,
  useCreateVoterMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addConfirmedVoterSchema } from '@/app/_validation/voter';

export const useAddConfirmedVoter = () => {
  const user = useSelector(selectUser);
  const [pollingCentersCurrentPage, setPollingCentersCurrentPage] = useState(1);
  const [pollingCentersTotalPages, setPollingCentersTotalPages] = useState(1);
  const [candidatesCurrentPage, setCandidatesCurrentPage] = useState(1);
  const [candidatesCentersTotalPages, setCandidatesTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createVoter, { isLoading: isLoadingVoter }] = useCreateVoterMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';
  const { refetch } = useVotersQuery(
    `State=2&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );

  // State Management
  const [usersSearch, setUsersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  // Lazy Query for Polling Centers
  const [
    fetchPollingCenters,
    { data: lazyPollingCenters, isFetching: isFetchingLazyPollingCenter }
  ] = useLazyPollingCentersQuery();

  const [fetchUsers, { data: lazyUsers, isFetching: isFetchingLazyUsers }] =
    useLazyUsersQuery();

  // Refs
  const fileRef = useRef<File | null>(null);

  // Form Setup
  const form = useForm<z.infer<typeof addConfirmedVoterSchema>>({
    resolver: zodResolver(addConfirmedVoterSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      img: '',
      address: '',
      state: 2,
      pollingCenterId: '',
      candidateId: '',
      serial: ''
    }
  });

  // Fetch Initial
  useEffect(() => {
    fetchPollingCenters(
      `PageNumber=1&PageSize=${pageSize}${electoralEntityIdQuery}`
    );
    fetchUsers(
      `Role=102&PageNumber=1&PageSize=${pageSize}${electoralEntityIdQuery}`
    );
  }, []);

  // Update When Data Changes
  useEffect(() => {
    if (lazyPollingCenters) {
      setPollingCentersSearch((prev) => [
        ...prev,
        ...lazyPollingCenters.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      ]);
      setPollingCentersTotalPages(lazyPollingCenters.totalPages);
    }
  }, [lazyPollingCenters]);

  useEffect(() => {
    if (lazyUsers) {
      setUsersSearch((prev) => [
        ...prev,
        ...lazyUsers.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      ]);
      setCandidatesTotalPages(lazyUsers.totalPages);
    }
  }, [lazyUsers]);

  // Scroll Event Handler for Infinite Scroll
  const onPollingCenterScrollEnd = () => {
    if (
      pollingCentersCurrentPage < pollingCentersTotalPages &&
      !isFetchingLazyPollingCenter
    ) {
      setPollingCentersCurrentPage((prev) => prev + 1);
      fetchPollingCenters(
        `PageNumber=${
          pollingCentersCurrentPage + 1
        }&PageSize=${pageSize}${electoralEntityIdQuery}`
      );
    }
  };

  const onUserScrollEnd = () => {
    if (
      candidatesCurrentPage < candidatesCentersTotalPages &&
      !isFetchingLazyUsers
    ) {
      setCandidatesCurrentPage((prev) => prev + 1);
      fetchUsers(
        `PageNumber=${
          candidatesCurrentPage + 1
        }&PageSize=${pageSize}${electoralEntityIdQuery}`
      );
    }
  };

  // Form Submission Handler
  const onSubmit = async () => {
    if (!fileRef.current) {
      toast.error('يجب ان ترفع صورة');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', fileRef.current as File);

      const response = await uploadFile(formData).unwrap();
      form.setValue('img', `${baseURL}/${response?.data}`);
      form.setValue('state', 2);
      const result = await createVoter(
        addConfirmedVoterSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast.error(error.data.title);
    } finally {
      refetch();
      setOpenAdd(false);
    }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingFile,
    isLoadingVoter,
    pollingCentersSearch,
    onPollingCenterScrollEnd,
    onUserScrollEnd,
    usersSearch,
    fileRef
  };
};
