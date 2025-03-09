/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { useUsersQuery, useGovCentersQuery } from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCandidateSchema } from '@/app/_validation/user';
import { baseURL } from '@/app/_lib/features/apiSlice';

export const useEditCandidate = ( { item }: { item: User; } ) =>
{
  const user = useSelector(selectUser)
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const [ uploadFile, { isLoading: isLoadingFile } ] = useUploadFileMutation();
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';
  
  const { refetch } = useUsersQuery(
    `Role=102&PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );

  // State Management
  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const {
    data: govCenters,
    isLoading: isLoadingGovCenters,
    refetch: refetchGovCenters
  } = useGovCentersQuery(`PageNumber=1&PageSize=30${electoralEntityIdQuery}`);

  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof editCandidateSchema>>({
    resolver: zodResolver(editCandidateSchema),
    defaultValues: {
      name: item.name,
      username: item.username,
      phone: item.phone,
      email: item.email,
      candidateSerial: item.candidateSerial,
      candidateListSerial: item.candidateListSerial,
      govCenterId: item.govCenter.id,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      profileImg: item.profileImg,
      role: 102,
    }
  });

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
        user: editCandidateSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error);
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

  // Effect to Update Search Options
  useEffect(() => {
    refetchGovCenters();
    if (!isLoadingGovCenters) {
      setGovCentersSearch(
        govCenters?.items.map((govCenter: any) => ({
          value: govCenter.id,
          label: govCenter.name
        }))
      );
    }
  }, [govCenters, isLoadingGovCenters, openUpdate]);

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
    fileRef,
    govCentersSearch,
    isLoadingFile
  };
};
