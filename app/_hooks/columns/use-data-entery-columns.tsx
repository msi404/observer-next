/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useSelector } from 'react-redux';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/custom/table-header';
import {EditDataEntryForm} from '@/app/_components/forms/edit-data-entry-form'
export const useDataEntryColumns = () => {
  const user = useSelector(selectUser);
  // @ts-expect-error
  const dataEntriesColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='اسم الموظف'
        />
      )
    },
    {
      id: 'govCenter',
      accessorKey: 'govCenter.name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='مكتب المحافظة'
        />
      ),
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
    },
    {
      id: 'phone',
      accessorKey: 'phone',
      header: 'رقم الهاتف',
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
	  },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'البريد الالكتروني',
      cell: ( { cell }: { cell: any; } ) =>
        {
          return <span className='text-xs'>{cell.getValue() ?? 'لا يوجد'}</span>;
        }
	  },
     hasPermission(user, 'view:addDataEntry') && {
           id: 'actions',
           accessorKey: 'actions',
           header: 'الاجرائات',
           cell: ({ row }: { row: any }) => {
             return (
                 <EditDataEntryForm item={row.original} />
             );
           }
         }
  ].filter(Boolean);

  return {
    dataEntriesColumns
  };
};
