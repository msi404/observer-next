/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectPageSize,
  selectCurrentPage
} from '@/app/_lib/features/paginationSlice';
import { selectUser } from '@/app/_lib/features/authSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChangeUserPasswordMutation } from '@/app/_services/mutationApi';
import { useUsersQuery } from '@/app/_services/fetchApi';
import {toast} from 'sonner'
import { changePasswordSchema } from '@/app/_validation/user';

export const useChangeUserPassword = ({
  role,
  id
}: {
  role: number;
  id: string;
}) => {
  const user = useSelector(selectUser);
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';
  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);

  const [changeUserPassword, { isLoading: isLoadingChangePassword }] =
    useChangeUserPasswordMutation();

  const { refetch } = useUsersQuery(
    `Role=${role}&PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );
  // Form Setup
  const changePasswordform = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      notify: false
    }
  });

  // Form Submission Handler
  const onPasswordChange = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      const result = await changeUserPassword({
        body: changePasswordSchema.parse(changePasswordform.getValues()),
        id
      }).unwrap();

      console.log(result);
    } catch (error: any) {
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
      console.log(error);
    } finally {
      refetch();
      setChangePasswordOpen(false);
    }
  };
	
	return {
		onPasswordChange,
		isLoadingChangePassword,
		changePasswordOpen,
		setChangePasswordOpen,
		changePasswordform
	}
};
