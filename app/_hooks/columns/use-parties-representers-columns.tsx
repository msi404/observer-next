/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useSelector } from 'react-redux';
import { type ColumnDef } from '@tanstack/react-table';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DataTableColumnHeader } from '@/app/_components/custom/table-header';
import {EditPartiesRepresentersForm} from '@/app/_components/forms/edit-parties-representers-form';
export const usePartiesRepresentersColumns = () =>
{
  const user = useSelector(selectUser);
  // @ts-ignore
  const partiesRepresentersColumns: ColumnDef<User>[] = [
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
      id: 'electoralEntity',
      accessorKey: 'electoralEntity.name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title='الكيان السياسي'
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
     {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        return (
            <EditPartiesRepresentersForm item={row.original} />
        );
      }
    }
  ].filter(Boolean);

  return {
    partiesRepresentersColumns
  };
};
