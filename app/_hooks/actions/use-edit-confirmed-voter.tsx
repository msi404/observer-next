'use client';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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
  usePollingCentersQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addConfirmedVoterSchema } from '@/app/_validation/voter';
import { baseURL } from '@/app/_services/api';

interface VoterItem {
  id: string;
  name: string;
  dateOfBirth: string;
  img: string;
  gender: string | number;
  pollingCenter: { id: string };
  candidate: { id: string };
  serial: string;
}

export const useEditConfirmedVoter = ({ item }: { item: VoterItem }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateVoter, { isLoading: isLoadingUpdate }] =
    useUpdateVoterMutation();
  const [deleteVoter, { isLoading: isLoadingDelete }] =
    useDeleteVoterMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useVotersQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
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
  const { data: pollingCenters, isLoading: isLoadingPollingCenters } =
    usePollingCentersQuery('');
  const { data: users, isLoading: isLoadingUsers } = useUsersQuery('Role=102');

  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addConfirmedVoterSchema>>({
    resolver: zodResolver(addConfirmedVoterSchema),
    defaultValues: {
      name: item.name,
      dateOfBirth: new Date(item.dateOfBirth),
      img: item.img,
      address: '',
      state: 0,
      // @ts-ignore
      gender: String(item.gender), // ✅ Convert to string
      pollingCenterId: String(item.pollingCenter.id),
      candidateId: String(item.candidate.id),
      serial: item.serial
    }
  });
  // Form Submission Handler
  const onUpdate = async () => {
    try {
      if (fileRef.current) {
        const formData = new FormData();
        formData.append('file', fileRef.current as File);

        const response = await uploadFile(formData).unwrap();
        form.setValue('img', `${baseURL}/${response?.data}`);
      } else {
        form.setValue('img', item.img);
      }
      await updateVoter({
        voter: addConfirmedVoterSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data,
        variant: 'destructive'
      });
      console.log(error);
    } finally {
      refetch();
      setOpenUpdate(false);
    }
  };

  // Effect to Update Search Options
  useEffect(() => {
    if (!isLoadingUsers) {
      setUsersSearch(
        users?.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      );
    }

    if (!isLoadingPollingCenters) {
      setPollingCentersSearch(
        pollingCenters?.data.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }
  }, [users, isLoadingUsers, pollingCenters, isLoadingPollingCenters]);

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
    usersSearch,
    fileRef
  };
};
