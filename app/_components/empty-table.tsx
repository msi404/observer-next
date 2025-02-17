'use client';
import { Fragment, type FC, type ReactElement } from 'react';
import { useSelector } from 'react-redux'
import {selectUser} from '@/app/_lib/features/authSlice'
import { motion } from 'motion/react';
import { Container } from '@/app/_components/container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/app/_components/ui/card';
import { ArchiveX, RefreshCcw } from 'lucide-react';
import { Show } from '@/app/_components/show';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { Dynamic } from '@/app//_components/dynamic';
import {type Permission} from '@/app/_auth/auth-rbac'
export const EmptyTable: FC<{ retry: VoidFunction; Add?: ReactElement, permission: Permission }> = ({
  retry,
  permission,
  Add
} ) =>
{
  const user = useSelector(selectUser)
  return (
    <Container>
      <Card className="p-4 h-96">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-3xl flex gap-3 justify-center items-center">
            <ArchiveX color="blue" size="35px" />
            <span>لاتوجد بيانات</span>
          </CardTitle>
          <CardDescription>
            يبدو ان ليس هناك بيانات هل تريد المحاولة مجدداً؟
          </CardDescription>
        </CardHeader>
        <CardContent className="text-primary flex justify-center items-center">
          <Show
            when={hasPermission(user, permission)}
            fallback={<Fragment />}
          >
            <Dynamic component={Add} />
          </Show>
          <motion.button
            onClick={retry}
            whileHover={{
              scale: 1.1,
              transition: {
                damping: 0,
                ease: 'linear',
                duration: 0.2
              }
            }}
            className="bg-slate-200 p-4 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <RefreshCcw size="35px" />
          </motion.button>
        </CardContent>
      </Card>
    </Container>
  );
};
