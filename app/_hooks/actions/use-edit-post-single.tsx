'use client';
import {useRouter} from 'next/navigation'
import { useState, useRef } from 'react';
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { usePostQuery } from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPostSchema } from '@/app/_validation/post';
import { baseURL } from '@/app/_services/api';

interface PostItem {
  id: string;
  title: string;
  content: string;
  img: string;
}

export const useEditPostSingle = ( { item }: { item: PostItem; } ) =>
{
  const router = useRouter()
  // API Mutations & Queries
  const [updatePost, { isLoading: isLoadingUpdate }] = useUpdatePostMutation();
  const [ deletePost, { isLoading: isLoadingDelete } ] = useDeletePostMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();

  // State Management

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { refetch } = usePostQuery(item.id);

    // Refs
    const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: item.title,
      content: item.content
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
         await updatePost({
           post: addPostSchema.parse(form.getValues()),
           id: item.id
         });
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    await deletePost(item.id);
    router.replace('/events')
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
    isLoadingFile,
    fileRef
  };
};
