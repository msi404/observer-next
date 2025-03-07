'use client';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/custom/table-header';
import { calcAge } from '@/app/_utils/calc-age';
import { Zoom } from '@/app/_components/custom/zoom';
import {EditConfirmedVoterForm} from '@/app/_components/forms/edit-confirmed-voter-form'
export const useConfirmedVotersColumns = () => {
  const user = useSelector(selectUser);
  // @ts-ignore
  const confirmedVotersColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='الاسم'
        />
      )
    },
    {
      id: 'dateOfBirth',
      accessorKey: 'birth',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='العمر'
        />
      ),
      cell: ({ cell }: { cell: any }) => {
        return (
          <span className="flex justify-center items-center">
            {calcAge(cell.getValue())}
          </span>
        );
      }
    },
    {
      id: 'province',
      accessorKey: 'province.gov.name',
      header: 'مكتب المحافظة',
      cell: ( { cell }: { cell: any; } ) =>
      {
        return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
      }
    },
    {
      id: 'pollingCenter',
      accessorKey: 'pollingCenter.name',
      header: 'مركز الاقتراع',
      cell: ({ cell }: { cell: any }) => {
        return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
      }
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'العنوان',
      cell: ({ cell }: { cell: any }) => {
        return <span className=' text-xs'>{cell.getValue()}</span>;
      }
    },
    {
      id: 'gender',
      accessorKey: 'gender',
      header: 'الجنس',
      cell: ({ cell }: { cell: any }) => {
        return <Fragment>{cell.getValue() === 0 ? 'ذكر' : 'انثى'}</Fragment>;
      }
    },
    {
      id: 'candidate',
      accessorKey: 'candidate.name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='المرشح'
        />
      ),
      cell: ({ cell }: { cell: any }) => {
        return <span>{cell.getValue() ?? 'لا يوجد'}</span>;
      }
    },
    {
      id: 'serial',
      accessorKey: 'serial',
      header: 'رقم بطاقة الناخب'
    },
    {
      id: 'img',
      accessorKey: 'card',
      header: 'صورة البطاقة',
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return <Zoom className='border w-16 h-12' preview={value} />;
      }
    },
    hasPermission(user, 'view:addVoter') && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditConfirmedVoterForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    confirmedVotersColumns
  };
};
