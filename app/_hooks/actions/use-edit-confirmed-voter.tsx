/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateVoterMutation,
  useDeleteVoterMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import {
  useVotersQuery,
  useLazyPollingCentersQuery,
  useLazyUsersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addConfirmedVoterSchema } from '@/app/_validation/voter';
import { baseURL } from '@/app/_lib/features/apiSlice';

interface VoterItem {
  id: string;
  name: string;
  birth: string;
  card: string;
  address: string,
  gender: string | number;
  pollingCenter: { id: string, name: string };
  candidate: { id: string, name: string };
  serial: string;
}

export const useEditConfirmedVoter = ( { item }: { item: VoterItem; } ) =>
{
    const user = useSelector(selectUser);
    const [pollingCentersCurrentPage, setPollingCentersCurrentPage] = useState(1);
    const [pollingCentersTotalPages, setPollingCentersTotalPages] = useState(1);
    const [candidatesCurrentPage, setCandidatesCurrentPage] = useState(1);
    const [candidatesCentersTotalPages, setCandidatesTotalPages] = useState(1);
    const pageSize = 10; // Fixed page size
  
    const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector( selectCurrentPage );
  
  // API Mutations & Queries
  const [updateVoter, { isLoading: isLoadingUpdate }] =
    useUpdateVoterMutation();
  const [deleteVoter, { isLoading: isLoadingDelete }] =
    useDeleteVoterMutation();
  const [ uploadFile, { isLoading: isLoadingFile } ] = useUploadFileMutation();
  
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
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);


  // Query Data
  // Lazy Query for Polling Centers
  const [
    fetchPollingCenters,
    {
      data: lazyPollingCenters,
      isFetching: isFetchingLazyPollingCenter,
    }
  ] = useLazyPollingCentersQuery();

  const [fetchUsers, {data: lazyUsers, isFetching: isFetchingLazyUsers}] = useLazyUsersQuery();


  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addConfirmedVoterSchema>>({
    resolver: zodResolver(addConfirmedVoterSchema),
    defaultValues: {
      name: item.name,
      dateOfBirth: new Date(item.birth),
      img: item.card,
      address: item.address,
      state: 2,
      // @ts-ignore
      gender: String(item.gender), // ✅ Convert to string
      pollingCenterId: item.pollingCenter?.id ?? '',
      candidateId: item.candidate?.id ?? '',
      serial: item.serial
    }
  } );
  
  // Fetch Initial
  useEffect(() => {
    fetchPollingCenters( `PageNumber=1&PageSize=${ pageSize }${ electoralEntityIdQuery }` );
    fetchUsers( `Role=102&PageNumber=1&PageSize=${pageSize}${electoralEntityIdQuery}`)
  }, []);

  // Update When Data Changes
  useEffect(() => {
    if (lazyPollingCenters) {
      setPollingCentersSearch((prev) => {
        // Convert previous values to a Set for quick lookup
        const existingIds = new Set(prev.map((pc) => pc.value));
  
        // Add only new unique items from API response
        const updatedOptions = lazyPollingCenters.items
          .map((pollingCenter: any) => ({
            value: pollingCenter.id,
            label: pollingCenter.name
          }))
          .filter((pc: any) => !existingIds.has(pc.value));
  
        // Ensure the selected polling center is included without duplication
        const selectedPollingCenter = item.pollingCenter
          ? { value: item.pollingCenter.id, label: item.pollingCenter.name }
          : null;
  
        return selectedPollingCenter && !existingIds.has(selectedPollingCenter.value)
          ? [selectedPollingCenter, ...prev, ...updatedOptions]
          : [...prev, ...updatedOptions];
      });
  
      setPollingCentersTotalPages(lazyPollingCenters.totalPages);
    }
  }, [ lazyPollingCenters ] );
  
  useEffect(() => {
    if (lazyUsers) {
      setUsersSearch((prev) => {
        // Convert previous values to a Set for quick lookup
        const existingIds = new Set(prev.map((u) => u.value));
  
        // Add only new unique items from API response
        const updatedOptions = lazyUsers.data.items
          .map((user: any) => ({
            value: user.id,
            label: user.name
          }))
          .filter((u: any) => !existingIds.has(u.value));
  
        // Ensure the selected candidate is included without duplication
        const selectedCandidate = item.candidate
          ? { value: item.candidate.id, label: item.candidate.name }
          : null;
  
        return selectedCandidate && !existingIds.has(selectedCandidate.value)
          ? [selectedCandidate, ...prev, ...updatedOptions]
          : [...prev, ...updatedOptions];
      });
  
      setCandidatesTotalPages(lazyUsers.totalPages);
    }
  }, [lazyUsers]);
  
  

// Scroll Event Handler for Infinite Scroll
const onPollingCenterScrollEnd = () => {
  if (pollingCentersCurrentPage < pollingCentersTotalPages && !isFetchingLazyPollingCenter) {
    setPollingCentersCurrentPage((prev) => prev + 1);
    fetchPollingCenters(`PageNumber=${pollingCentersCurrentPage + 1}&PageSize=${pageSize}${electoralEntityIdQuery}`);
  }
};

const onUserScrollEnd = () => {
  if (candidatesCurrentPage < candidatesCentersTotalPages && !isFetchingLazyUsers) {
    setCandidatesCurrentPage((prev) => prev + 1);
    fetchUsers(`PageNumber=${candidatesCurrentPage + 1}&PageSize=${pageSize}${electoralEntityIdQuery}`);
  }
};

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      if (fileRef.current) {
        const formData = new FormData();
        formData.append('file', fileRef.current as File);

        const response = await uploadFile(formData).unwrap();
        form.setValue('img', `${baseURL}/${response?.data}`);
      } else {
        form.setValue('img', item.card);
      }
      await updateVoter({
        voter: addConfirmedVoterSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data?.msg || 'An unexpected error occurred',
        variant: 'destructive'
      });
      console.log(error);
    } finally {
      refetch();
      setOpenUpdate(false);
    }
  };

  const onDelete = async () => {
    await deleteVoter(item.id);
    refetch();
  };

  return {
    openDelete,
    openUpdate,
    setOpenDelete,
    setOpenUpdate,
    onDelete,
    isLoadingDelete,
    onUpdate,
    isLoadingUpdate,
    form,
    isLoadingFile,
    pollingCentersSearch,
    onPollingCenterScrollEnd,
    onUserScrollEnd,
    usersSearch,
    fileRef
  };
};
