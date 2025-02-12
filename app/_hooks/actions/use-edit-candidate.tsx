'use client';
import { useState, useRef} from 'react';
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
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCandidateSchema } from '@/app/_validation/user';
import { baseURL } from '@/app/_services/api';

interface CandiateItem {
  id: string;
  name: string;
  dateOfBirth: string;
  candidateSerial: string;
  candidateListSerial: string;
  profileImg: string;
  phone: string;
  password: string;
  username: string;
  email: string;
}

export const useEditCandidate = ({ item }: { item: CandiateItem }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [ deleteUser, { isLoading: isLoadingDelete } ] = useDeleteUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useUsersQuery(
    `Role=102&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [ openDelete, setOpenDelete ] = useState<boolean>( false );
  
    const fileRef = useRef<File | null>(null);
  
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addCandidateSchema>>({
    resolver: zodResolver(addCandidateSchema),
    defaultValues: {
      name: item.name,
      username: item.username,
      phone: item.phone,
      email: item.email,
      // @ts-ignore
      candidateSerial: item.candidateSerial,
      // @ts-ignore
      candidateListSerial: item.candidateListSerial,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      profileImg: item.profileImg,
      role: 102
    }
  });

  // Form Submission Handler
  const onUpdate = async () => {
    try
    {
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
        user: addCandidateSchema.parse(form.getValues()),
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
          description: error.data.title || 'An unexpected error occurred',
          variant: 'destructive'
        });
      }
    }
    finally
    {
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
    fileRef,
    isLoadingFile
  };
};
