'use client';
import { useSelector } from 'react-redux';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import {EditObserverForm} from '@/app/_components/forms/edit-observer-form'
export const useObserverColumns = () => {
  const user = useSelector(selectUser);
  // @ts-ignore
  const observersColumns: ColumnDef<ConfirmedVoters>[] = [
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
 hasPermission(user, 'view:addObserver') && {
           id: 'actions',
           accessorKey: 'actions',
           header: 'الاجرائات',
           cell: ({ row }: { row: any }) => {
             return (
                 <EditObserverForm item={row.original} />
             );
           }
         }
  ].filter(Boolean);

  return {
    observersColumns
  };
};
