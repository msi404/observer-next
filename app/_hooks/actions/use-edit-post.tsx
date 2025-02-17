'use client';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { usePostsQuery } from '@/app/_services/fetchApi';
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

export const useEditPost = ({ item }: { item: PostItem }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updatePost, { isLoading: isLoadingUpdate }] = useUpdatePostMutation();
  const [ deletePost, { isLoading: isLoadingDelete } ] = useDeletePostMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();

  // State Management

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { refetch } = usePostsQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );

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

  const onDelete = async () => {
    await deletePost(item.id);
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
    isLoadingFile,
    fileRef
  };
};
