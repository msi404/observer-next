'use client';

import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Hooks
import { useToast } from '@/app/_hooks/use-toast';

// API Services
import { baseURL } from '@/app/_services/api';
import {
  useCreatePostMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { usePostsQuery } from '@/app/_services/fetchApi';

// Validation Schemas
import { addPostSchema } from '@/app/_validation/post';

export const useAddPost = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const [createPost, { isLoading: isLoadingPost }] = useCreatePostMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchPosts } = usePostsQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );
  // Toast Hook
  const { toast } = useToast();

  // Refs
  const fileRef = useRef<File | null>(null);

  // Form Setup
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: '',
      content: '',
      img: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
     if (!fileRef.current) {
          toast({
            title: 'لايوجد صورة',
            description: 'يجب ان ترفع صورة',
            variant: 'destructive'
          });
          return;
        }
        try {
          const formData = new FormData();
          formData.append('file', fileRef.current as File);
    
          const response = await uploadFile(formData).unwrap();
          form.setValue('img', `${baseURL}/${response?.data}`);
          const result = await createPost(
            addPostSchema.parse(form.getValues())
          ).unwrap();
    
          console.log(result);
        } catch (error: any) {
          toast({
            title: 'Error',
            description: error.data.title,
            variant: 'destructive'
          });
        } finally
        {
          form.reset()
          refetchPosts();
          setOpenAdd( false );
        }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingPost,
    isLoadingFile,
    fileRef
  };
};
