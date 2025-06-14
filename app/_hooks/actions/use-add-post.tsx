/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {useRouter} from 'next/navigation'
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {selectContent} from '@/app/_lib/features/editorSlice'
import { selectUser } from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {toast} from 'sonner'

// API Services
import { baseURL } from '@/app/_lib/features/apiSlice';
import {
  useCreatePostMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { usePostsQuery } from '@/app/_services/fetchApi';

// Validation Schemas
import { addPostSchema } from '@/app/_validation/post';

export const useAddPost = () =>
{
  const router = useRouter()
  const content = useSelector(selectContent)
  const user = useSelector(selectUser)
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const [createPost, { isLoading: isLoadingPost }] = useCreatePostMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&UserElectoralEntityId=${ electoralEntityId }` : '';
  // Query Data
  const { refetch: refetchPosts } = usePostsQuery(
    `PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );

  // Refs
  const fileRef = useRef<File | null>(null);
  // Form Setup
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: '',
      content: content || '',
      img: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
     if (!fileRef.current) {
          toast.error('يجب ان ترفع صورة.')
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
          toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
        } finally
        {
          form.reset()
          router.replace('/events')
          refetchPosts();
          setOpenAdd( false );
        }
  };
   // Sync Redux content with form field
   useEffect(() => {
    form.setValue('content', content || '');
  }, [content, form]);

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
